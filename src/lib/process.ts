import { Portal } from "../types/portal"
import { drawLine } from "./canvas-helper"
import { Column } from "../types/column"
import { BlockhashWorker } from "./blockhash-worker"

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

const blockhashWorker = new BlockhashWorker()

const compareColor = (a: Color, b: Color, distance: number): boolean => {
  const score = (a.r - b.r) * (a.r - b.r) + (a.g - b.g) * (a.g - b.g) + (a.b - b.b) * (a.b - b.b)
  return score <= distance
}

const readPoint = (image: ImageData, x: number, y: number): Color => {
  if (x > image.width || y > image.height || x < 0 || y < 0) {
    throw new Error(`Invalid point (${x},${y}) in image (${image.width},${image.height})`)
  }

  const offset = (image.width * y + x) * 4
  return {
    r: image.data[offset],
    g: image.data[offset + 1],
    b: image.data[offset + 2],
    a: image.data[offset + 3],
  }
}

const isRowBlank = (image: ImageData, y: number, threshold: number, bgColor: Color, from = 0, to = image.width): boolean => {
  for (let i = from; i < to; ++i) {
    const color = readPoint(image, i, y)

    if (!compareColor(color, bgColor, threshold)) {
      // console.log(`Diff: (${i}, ${y}) - (${color.r}, ${color.g}, ${color.b})`)
      return false
    }
  }

  return true
}

const isColumnBlank = (image: ImageData, x: number, threshold: number, bgColor: Color, from = 0, to = image.height): boolean => {
  for (let i = from; i < to; ++i) {
    const color = readPoint(image, x, i)

    if (!compareColor(color, bgColor, threshold)) {
      // console.log(`Diff: (${x}, ${i}) - (${color.r}, ${color.g}, ${color.b})`)
      return false
    }
  }

  return true
}

export async function parseImage(ctx: CanvasRenderingContext2D, width: number, height: number, threshold = 800, drawLines = false): Promise<Column[]> {
  const data = ctx.getImageData(0, 0, width, height)

  const bgColor = readPoint(data, 0, 0)
  console.log('BgColor:', bgColor)

  let globalTop = 0

  ctx.lineWidth = 1
  ctx.strokeStyle = '#0FF'
  ctx.fillStyle = '#0FF'

  // Step.1 Read header
  while ((++globalTop) < data.height && isRowBlank(data, globalTop, threshold, bgColor));
  while ((++globalTop) < data.height && !isRowBlank(data, globalTop, threshold, bgColor));
  while ((++globalTop) < data.height && isRowBlank(data, globalTop, threshold, bgColor));

  console.log('globalTop:', globalTop)
  if (drawLines) {
    ctx.strokeStyle = '#0FF'
    drawLine(ctx, [[0, globalTop - 1], [data.width, globalTop - 1]])
  }
  
  // Step.2 Read columns
  let x = 0
  let i = 0

  const columns: Column[] = []

  while (x < data.width) {
    // Step 2.1 Find non-blank column
    while (x < data.width && isColumnBlank(data, x, threshold, bgColor, globalTop)) ++x;
    const left = x
    
    // Step 2.2 Find blank column
    while (x < data.width && !isColumnBlank(data, x, threshold, bgColor, globalTop)) ++x;
    const right = x

    if (left >= right) break

    const column: Column = {
      top: globalTop,
      left,
      right,
      bottom: data.height,
      images: [],
    }

    const index = ++i
    console.log(`Column #${index}:`, left, right)

    if (drawLines) {
      ctx.strokeStyle = '#0FF'
      drawLine(ctx, [[left - 1, globalTop], [left - 1, data.height]])

      ctx.strokeStyle = '#F0F'
      drawLine(ctx, [[right, globalTop], [right, data.height]])
    }

    // Step 2.3 Find each row
    let y = globalTop
    while (y < data.height) {
      // Step 2.3.1 Find non-blank row
      while (y < data.height && isRowBlank(data, y, threshold, bgColor, left, right)) ++y;
      const top = y
      
      // Step 2.3.2 Find blank row
      while (y < data.height && !isRowBlank(data, y, threshold, bgColor, left, right)) ++y;
      const bottom = y

      if (top >= bottom) break

      // Step 2.3.3 Find first blank column
      let dx = left
      while (dx < right && !isColumnBlank(data, dx, threshold, bgColor, top, bottom)) ++dx;
      const fixedRight = dx


      if (drawLines) {
        ctx.strokeStyle = '#0FF'
        drawLine(ctx, [[left, top - 1], [right, top - 1]])
  
        ctx.strokeStyle = '#F0F'
        drawLine(ctx, [[left, bottom], [right, bottom]])
  
        ctx.strokeStyle = '#FF0'
        drawLine(ctx, [[fixedRight, top], [fixedRight, bottom]])
      }

      console.log(`Image: (${left},${top}),(${fixedRight},${bottom})`)
      const imgData = ctx.getImageData(left, top, fixedRight - left, bottom - top)
      column.images.push({
        top,
        left,
        right,
        bottom,
        hash: await blockhashWorker.getHash(imgData, 16, 2)
      })
    }

    columns.push(column)
  }

  return columns
}

export function portalsToPoints(portals: (Portal | null)[], width: number, height: number, dx: number = 0, dy: number = 0): number[][] {
  const validPortals = portals.filter(item => item) as Portal[]
  const top = Math.max(...validPortals.map(item => item.latE6))
  const bottom = Math.min(...validPortals.map(item => item.latE6))
  const left = Math.min(...validPortals.map(item => item.lngE6))
  const right = Math.max(...validPortals.map(item => item.lngE6))

  const scale = Math.min(height / (top - bottom), width / (right - left))
  const actualWidth = (right - left) * scale
  const actualHeight = (top - bottom) * scale

  return validPortals.map(({ lngE6, latE6 }) => {
    const x = dx + (width - actualWidth) / 2 + (lngE6 - left) * scale
    const y = dy + (width - actualHeight) / 2 + (top - latE6) * scale
    
    return [x, y]
  })
}

export async function findNearestHash(hash: string, hashes: string[]): Promise<number> {
  let score = Infinity
  let index = -1
  for (let i = 0; i < hashes.length; ++i) {
    const item = hashes[i]
    if (!item) continue

    const curScore = await blockhashWorker.getDistance(item, hash)
    if (curScore < score) {
      score = curScore
      index = i
    }
  }

  return index
}