import { Sketch } from '../handcar'
const q = new Sketch()
q.size(640, 360)

// https://www.youtube.com/watch?v=s3Facu6ZVeA

q.draw = () => {
  q.background(255)
  drawCircle(q.width / 2, q.height / 2, 300)
}

function drawCircle(x, y, d) {
  q.stroke(0)
  q.noFill()
  q.ellipse(x, y, d, d)
  if (d > 2) {
    drawCircle(x + d / 2, y, d / 2)
    drawCircle(x - d / 2, y, d / 2)
    drawCircle(x, y + d / 2, d / 2)
  }
}
