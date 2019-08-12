import { Sketch, PVector } from '../handcar'
const q = new Sketch()

q.size(640, 360)

const len = 180
const origin = new PVector(q.width / 2, 0)
const bob = new PVector(q.width / 2, len)

q.draw = () => {
  q.background(255)
  q.line(origin.x, origin.y, bob.x, bob.y)
  q.ellipse(bob.x, bob.y, 32, 32)
}
