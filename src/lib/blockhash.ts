/*!
 * Perceptual image hash calculation tool based on algorithm descibed in
 * Block Mean Value Based Image Perceptual Hashing by Bian Yang, Fan Gu and Xiamu Niu
 *
 * Copyright 2014 Commons Machinery http://commonsmachinery.se/
 * Distributed under an (MIT license)[https://github.com/commonsmachinery/blockhash-js/blob/master/LICENSE].
 * 
 * TypeScript migration by zhyupe, Distributed under AGPL-3.0.
 */

import JPEG from 'jpeg-js'
import { PNG } from 'pngjs'

let one_bits = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4];

/* Calculate the hamming distance for two hashes in hex format */
let hammingDistance = function (hash1: string, hash2: string) {
  let d = 0;
  let i;
  for (i = 0; i < hash1.length; i++) {
    let n1 = parseInt(hash1[i], 16);
    let n2 = parseInt(hash2[i], 16);
    d += one_bits[n1 ^ n2];
  }
  return d;
};

let median = function (data: number[]) {
  let mdarr = data.slice(0);
  mdarr.sort((a, b) => a - b);
  if (mdarr.length % 2 === 0) {
    return (mdarr[mdarr.length / 2] + mdarr[mdarr.length / 2 + 1]) / 2.0;
  }
  return mdarr[Math.floor(mdarr.length / 2)];
};

let bits_to_hexhash = function (bitsArray: number[]) {
  let hex = [];
  for (let i = 0; i < bitsArray.length; i += 4) {
    let nibble = bitsArray.slice(i, i + 4);
    hex.push(parseInt(nibble.join(''), 2).toString(16));
  }

  return hex.join('');
};

let bmvbhash_even = function (data: ImageData, bits: number) {
  let blocksize_x = Math.floor(data.width / bits);
  let blocksize_y = Math.floor(data.height / bits);

  let result = [];

  for (let y = 0; y < bits; y++) {
    for (let x = 0; x < bits; x++) {
      let total = 0;

      for (let iy = 0; iy < blocksize_y; iy++) {
        for (let ix = 0; ix < blocksize_x; ix++) {
          let cx = x * blocksize_x + ix;
          let cy = y * blocksize_y + iy;
          let ii = (cy * data.width + cx) * 4;

          let alpha = data.data[ii + 3];
          if (alpha === 0) {
            total += 765;
          } else {
            total += data.data[ii] + data.data[ii + 1] + data.data[ii + 2];
          }
        }
      }

      result.push(total);
    }
  }

  let m = [];
  for (let i = 0; i < 4; i++) {
    m[i] = median(result.slice(i * bits * bits / 4, i * bits * bits / 4 + bits * bits / 4));
  }
  for (let i = 0; i < bits * bits; i++) {
    if (((result[i] < m[0]) && (i < bits * bits / 4))
      || ((result[i] < m[1]) && (i >= bits * bits / 4) && (i < bits * bits / 2))
      || ((result[i] < m[2]) && (i >= bits * bits / 2) && (i < bits * bits / 4 + bits * bits / 2))
      || ((result[i] < m[3]) && (i >= bits * bits / 2 + bits * bits / 4))
    ) {
      result[i] = 0;
    } else {
      result[i] = 1;
    }
  }

  return bits_to_hexhash(result);
};

let bmvbhash = function (data: ImageData, bits: number) {
  let result = [];

  let i, j, x, y;
  let block_width, block_height;
  let weight_top, weight_bottom, weight_left, weight_right;
  let block_top, block_bottom, block_left, block_right;
  let y_mod, y_frac, y_int;
  let x_mod, x_frac, x_int;
  let blocks: number[][] = [];

  let even_x = data.width % bits === 0;
  let even_y = data.height % bits === 0;

  if (even_x && even_y) {
    return bmvbhash_even(data, bits);
  }

  // initialize blocks array with 0s
  for (i = 0; i < bits; i++) {
    blocks.push([]);
    for (j = 0; j < bits; j++) {
      blocks[i].push(0);
    }
  }

  block_width = data.width / bits;
  block_height = data.height / bits;

  for (y = 0; y < data.height; y++) {
    if (even_y) {
      // don't bother dividing y, if the size evenly divides by bits
      block_top = block_bottom = Math.floor(y / block_height);
      weight_top = 1;
      weight_bottom = 0;
    } else {
      y_mod = (y + 1) % block_height;
      y_frac = y_mod - Math.floor(y_mod);
      y_int = y_mod - y_frac;

      weight_top = (1 - y_frac);
      weight_bottom = (y_frac);

      // y_int will be 0 on bottom/right borders and on block boundaries
      if (y_int > 0 || (y + 1) === data.height) {
        block_top = block_bottom = Math.floor(y / block_height);
      } else {
        block_top = Math.floor(y / block_height);
        block_bottom = Math.ceil(y / block_height);
      }
    }

    for (x = 0; x < data.width; x++) {
      let ii = (y * data.width + x) * 4;

      let avgvalue, alpha = data.data[ii + 3];
      if (alpha === 0) {
        avgvalue = 765;
      } else {
        avgvalue = data.data[ii] + data.data[ii + 1] + data.data[ii + 2];
      }

      if (even_x) {
        block_left = block_right = Math.floor(x / block_width);
        weight_left = 1;
        weight_right = 0;
      } else {
        x_mod = (x + 1) % block_width;
        x_frac = x_mod - Math.floor(x_mod);
        x_int = x_mod - x_frac;

        weight_left = (1 - x_frac);
        weight_right = x_frac;

        // x_int will be 0 on bottom/right borders and on block boundaries
        if (x_int > 0 || (x + 1) === data.width) {
          block_left = block_right = Math.floor(x / block_width);
        } else {
          block_left = Math.floor(x / block_width);
          block_right = Math.ceil(x / block_width);
        }
      }

      // add weighted pixel value to relevant blocks
      blocks[block_top][block_left] += avgvalue * weight_top * weight_left;
      blocks[block_top][block_right] += avgvalue * weight_top * weight_right;
      blocks[block_bottom][block_left] += avgvalue * weight_bottom * weight_left;
      blocks[block_bottom][block_right] += avgvalue * weight_bottom * weight_right;
    }
  }

  for (i = 0; i < bits; i++) {
    for (j = 0; j < bits; j++) {
      result.push(blocks[i][j]);
    }
  }

  let m = [];
  for (let i = 0; i < 4; i++) {
    m[i] = median(result.slice(i * bits * bits / 4, i * bits * bits / 4 + bits * bits / 4));
  }
  for (let i = 0; i < bits * bits; i++) {
    if (((result[i] < m[0]) && (i < bits * bits / 4))
      || ((result[i] < m[1]) && (i >= bits * bits / 4) && (i < bits * bits / 2))
      || ((result[i] < m[2]) && (i >= bits * bits / 2) && (i < bits * bits / 4 + bits * bits / 2))
      || ((result[i] < m[3]) && (i >= bits * bits / 2 + bits * bits / 4))
    ) {
      result[i] = 0;
    } else {
      result[i] = 1;
    }
  }

  return bits_to_hexhash(result);
};

let blockhashData = function (imgData: ImageData, bits: number, method: number) {
  let hash;

  if (method === 1) {
    hash = bmvbhash_even(imgData, bits);
  }
  else if (method === 2) {
    hash = bmvbhash(imgData, bits);
  }
  else {
    throw new Error("Bad hashing method");
  }

  return hash;
};

let blockhash = async function (src: string, bits: number, method: number): Promise<string> {
  if (!src) {
    throw new Error('src not provided')
  }
  const res = await fetch(src)
  const contentType = res.headers.get('content-type')

  if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
    throw new Error(`Unexcepted content-type: ${contentType}`)
  }

  const buffer = await res.arrayBuffer()
  let imgData: ImageData | null = null
  if (contentType === 'image/png') {
    const png = await new Promise<PNG>((resolve, reject) => {
      new PNG({ filterType: 4 }).parse(buffer as Buffer, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })

    imgData = {
      width: png.width,
      height: png.height,
      data: png.data as any
    };
  } else if (contentType === 'image/jpeg') {
    imgData = JPEG.decode(buffer) as any;
  }

  return blockhashData(imgData as ImageData, bits, method)
};

export {
  hammingDistance,
  blockhash,
  blockhashData
}
