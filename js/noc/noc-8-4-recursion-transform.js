import { Sketch } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=RWAcbV4X7C8

q.size(640, 360)

let theta = Math.PI / 6

q.draw = () => {
  q.background(255)
  theta = q.map(q.mouseX, 0, q.width, 0, Math.PI)
  q.stroke(0)
  q.translate(q.width / 2, q.height)
  branch(100)
}

function branch(len) {
  q.line(0, 0, 0, -len)
  q.translate(0, -len)
  len *= 0.66
  if (len > 2) {
    // right
    q.pushMatrix()
    q.rotate(theta)
    branch(len)
    q.popMatrix()
    // left
    q.pushMatrix()
    q.rotate(-theta)
    branch(len)
    q.popMatrix()
  }
}
