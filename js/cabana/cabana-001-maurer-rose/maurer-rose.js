import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

s.draw = () => {
  s.background(0)
  s.translate(s.width / 2, s.height / 2)
  s.stroke(255)
  s.noFill()
  s.beginShape()
  for (let a = 0; a < 360; a++) {
    const r = 150
    const x = r * s.cos(s.radians(a))
    const y = r * s.sin(s.radians(a))
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
}
