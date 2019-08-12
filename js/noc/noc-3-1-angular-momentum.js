import { Sketch } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=qMq-zd6hguc

q.size(640, 360)

let a = 0.0
let aVelocity = 0.0
let aAcceleration = 0.001

q.draw = () => {
  q.background(255)

  aAcceleration = q.map(q.mouseX, 0, q.width, -0.001, 0.001)

  a += aVelocity
  aVelocity += aAcceleration

  q.rectMode(q.CENTER)
  q.stroke(0)
  q.fill(127)
  q.translate(q.width / 2, q.height / 2)
  q.rotate(a)
  q.rect(0, 0, 64, 36)
}
