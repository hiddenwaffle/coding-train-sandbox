import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(600, 600)

let x = 0
let y = 0

s.background(51)
s.stroke(32, 255, 128, 100)
s.strokeWeight(2)
s.draw = () => {
  for (let i = 0; i < 100; i++) {
    drawPoint()
    nextPoint()
  }
}

function drawPoint() {
  const px = s.map(x, -2.1820, 2.6558, 0, s.width)
  const py = s.map(y, 0, 9.9983, s.height, 0)
  s.point(px, py)
}

function nextPoint() {
  let nextX
  let nextY
  const r = s.random(1)
  if (r < 0.01) {
    nextX = 0
    nextY = 0.16 * y
  } else if (r < 0.86) {
    nextX =  0.85 * x + 0.04 * y
    nextY = -0.04 * x + 0.85 * y + 1.6
  } else if (r < 0.93) {
    nextX = 0.2  * x + -0.26 * y
    nextY = 0.23 * x + 0.22 * y + 1.6
  } else {
    nextX = -0.15 * x + 0.28 * y
    nextY = 0.26 * x + 0.24 * y + 0.44
  }
  x = nextX
  y = nextY
}
