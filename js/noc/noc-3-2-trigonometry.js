import { Sketch } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=znOBmOrtz_M

q.size(640, 360)

const r = 150
let a = 0
let aVel = 0
let aAcc = 0.001

q.draw = () => {
  q.background(0)
  q.translate(q.width / 2, q.height / 2)
  const x = r * Math.cos(a)
  const y = r * Math.sin(a)
  q.fill(255)
  q.stroke(255)
  q.line(0, 0, x, y)
  q.ellipse(x, y, 50, 50)

  a += aVel
  aVel += aAcc
  aVel = q.constrain(aVel, 0, 0.1)
}
