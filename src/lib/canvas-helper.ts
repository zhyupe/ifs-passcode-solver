
export function drawLine(ctx: CanvasRenderingContext2D, points: number[][]) {
  ctx.beginPath()
  points.forEach(([x, y], index) => {
    ctx[index === 0 ? 'moveTo' : 'lineTo'](x, y)
  })
  ctx.stroke()
}
