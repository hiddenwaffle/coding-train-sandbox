import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

// https://www.youtube.com/watch?v=4uU9lZ-HSqA

let n = 0
let d = 0

s.draw = () => {
  s.background(0)
  s.translate(s.width / 2, s.height / 2)
  s.stroke(255)
  s.strokeWeight(1)
  s.noFill()
  s.beginShape()
  for (let i = 0; i < 361; i++) {
    const k = i * d
    const r = 150 * s.sin(s.radians(n * k))
    const x = r * s.cos(s.radians(k))
    const y = r * s.sin(s.radians(k))
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
  s.stroke(255, 0, 255)
  s.strokeWeight(2)
  s.beginShape()
  for (let i = 0; i < 361; i++) {
    const k = i
    const r = 150 * s.sin(s.radians(n * k))
    const x = r * s.cos(s.radians(k))
    const y = r * s.sin(s.radians(k))
    s.vertex(x, y)
  }
  s.endShape()
  n += 0.005
  d += 0.01
}
