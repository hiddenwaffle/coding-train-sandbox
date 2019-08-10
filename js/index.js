import { Sketch } from './railbike'
const q = new Sketch()

q.size(640, 360)
let circleX = q.width / 2
let circleY = q.height / 2

q.draw = () => {
  circleX = q.random(q.width)
  circleY = q.random(q.height)
  // q.background(50)
  q.fill(255, 128)
  q.ellipse(circleX, circleY, 24, 24)
}
