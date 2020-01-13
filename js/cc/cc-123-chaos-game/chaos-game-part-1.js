import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(800, 600)

let ax = s.width / 2
let ay = 0
let bx = 0
let by = s.height
let cx = s.width
let cy = s.height
let x = s.random(s.width)
let y = s.random(s.height)

s.background(0)
s.stroke(255)
s.point(ax, ay)
s.point(bx, by)
s.point(cx, cy)

s.draw = () => {
  for (let i = 0; i < 100; i++) {
    s.point(x, y)
    const r = s.floor(s.random(3))
    if (r === 0) {
      s.stroke(255, 0, 255)
      x = s.lerp(x, ax, 0.5)
      y = s.lerp(y, ay, 0.5)
    } else if (r === 1) {
      s.stroke(0, 255, 255)
      x = s.lerp(x, bx, 0.5)
      y = s.lerp(y, by, 0.5)
    } else if (r === 2) {
      s.stroke(255, 255, 0)
      x = s.lerp(x, cx, 0.5)
      y = s.lerp(y, cy, 0.5)
    }
  }
}
