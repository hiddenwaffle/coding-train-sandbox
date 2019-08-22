import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(200, 200)

let yoff = 0
let da = s.PI / 100
let dx = 0.1

s.draw = () => {
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  s.rotate(s.PI / 2)
  s.stroke(0, 192, 255)
  s.strokeWeight(1)
  s.fill(64, 128, 255)
  let xoff = 0
  s.beginShape()
  for (let a = -s.PI / 2; a < s.PI / 2; a += da) {
    const n = s.noise(xoff, yoff)
    const r = s.sin(2 * a) * s.map(n, 0, 1, 50, 100)
    const x = r * s.cos(a)
    const y = s.sin(yoff) * r * s.sin(a)
    xoff += dx
    s.vertex(x, y)
  }
  for (let a = s.PI / 2; a <= 3 * s.PI / 2; a += da) {
    const n = s.noise(xoff, yoff)
    const r = s.sin(2 * a) * s.map(n, 0, 1, 50, 100)
    const x = r * s.cos(a)
    const y = s.sin(yoff) * r * s.sin(a)
    xoff -= dx
    s.vertex(x, y)
  }
  s.endShape()
  yoff += 0.1
}
