import { blockhashData, hammingDistance } from "./blockhash"

const runJobs = (job: string, params: any) => {
  switch (job) {
    case 'hash': {
      const { data, bits, method } = params
      return blockhashData(data, bits, method)
    }
    case 'distance': {
      const { a, b } = params
      return hammingDistance(a, b)
    }
  }
}

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;
ctx.onmessage = (event) => {
  const { id, job, ...params } = event.data
  const result = runJobs(job, params)
  ctx.postMessage({ id, result })
}
