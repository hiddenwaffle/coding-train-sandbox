import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

s.draw = () => {
  s.background(0)
  s.translate(200, 200)
  s.rotate(s.radians(-90))
  const hr = s.hour()
  const mn = s.minute()
  const sc = s.second()
  s.noFill()
  s.strokeWeight(8)
  s.stroke(204, 0, 53)
  const end1 = s.map(sc, 0, 60, 0, 360)
  s.arc(0, 0, 300, 300, 0, s.radians(end1))
  s.stroke(53, 76, 161)
  const end2 = s.map(mn, 0, 60, 0, 360)
  s.arc(0, 0, 280, 280, 0, s.radians(end2))
  const end3 = s.map(hr % 12, 0, 12, 0, 360)
  s.stroke(255)
  s.arc(0, 0, 260, 260, 0, s.radians(end3))
}
