export const canvas = document.createElement('canvas')
document.querySelector('.game').appendChild(canvas)
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = true

export function push() {
  ctx.save()
}

export function pop() {
  ctx.restore()
}

export function drawLine(x1, y1, x2, y2, intersecting) {
  push()
  ctx.lineWidth = 4
  if (!intersecting) {
    ctx.beginPath()
    ctx.strokeStyle = intersecting ? '#FF000064' : '#FFFFFFAA'
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.closePath()
    ctx.stroke()
  }
  ctx.beginPath()
  let disp = Math.floor(Math.random() * 4) - 2
  ctx.strokeStyle = intersecting ? '#FF001164' : '#FFFFAAAA'
  ctx.moveTo(x1 + disp, y1 + disp)
  ctx.lineTo(x2 + disp, y2 + disp)
  ctx.closePath()
  ctx.stroke()
  pop()
}

export function stroke() {
  ctx.stroke()
}

export function resizeCanvas(width) {
  canvas.width = width
  canvas.height = width
}

export function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}