// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./blockhash.worker.ts';

export class BlockhashWorker {
  map: Record<string, Function> = {}
  worker = new Worker()

  counter = 0

  constructor() {
    this.worker.onmessage = (ev) => {
      const { id, result } = ev.data
      if (!id || !this.map[id]) {
        console.warn(`Cannot find corresponding handler: ${id}, ${result}`)
        return
      }

      this.map[id](result)
      delete this.map[id]
    }
  }

  getHash(data: ImageData, bits: number, method: number): Promise<string> {
    return this.newJob('hash', { data, bits, method })
  }

  getDistance(a: string, b: string): Promise<number> {
    return this.newJob('distance', { a, b })
  }

  private newJob(job: string, params: any): Promise<any> {
    return new Promise((resolve) => {
      const id = ++this.counter
      this.map[id] = resolve

      this.worker.postMessage({ id, job, ...params })
    })
  }
}
