import { Sketch, Vector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=9iaEqGOh5WM

q.size(640, 360)

const len = 180
const origin = new Vector(q.width / 2, 0)
const bob = new Vector(q.width / 2, len)
let angle = Math.PI / 4
let aVel = 0
let aAcc = 0

q.draw = () => {
  q.background(255)
  bob.x = origin.x + len * Math.sin(angle)
  bob.y = origin.y + len * Math.cos(angle)
  q.line(origin.x, origin.y, bob.x, bob.y)
  q.ellipse(bob.x, bob.y, 32, 32)
  aAcc = -0.01 * Math.sin(angle)
  angle += aVel
  aVel += aAcc
  aVel *= 0.99
}
