const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d', { alpha: false })
canvas.id = 'canvas'
canvas.width = 640
canvas.height = 360
document.body.appendChild(canvas)

class Vector2D {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Blob {
  constructor(x, y) {
    this.pos = new Vector2D(x, y)
    this.r = 40
  }

  show() {
    ctx.fillStyle = 'rgb(255, 0, 128)'
    ctx.strokeStyle = 'rgb(255, 0, 128)'
    ctx.beginPath()
    ctx.ellipse(this.pos.x, this.pos.y, this.pos.r, this.r, Math.PI / 4, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

const b = new Blob(100, 100)

function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) +
                   Math.pow(y2 - y1, 2))
}

function draw() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      const d = Math.floor(dist(x, y, canvas.width / 2, canvas.height / 2))
      const index = (x + y * canvas.width) * 4
      data[index] = d
      data[index + 1] = d
      data[index + 2] = d
    }
  }
  b.show()
}

function loop() {
  draw()
  requestAnimationFrame(loop)
}
loop()
