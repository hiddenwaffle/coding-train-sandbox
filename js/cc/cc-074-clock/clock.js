import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

s.draw = () => {
  s.background(0)
  const hr = s.hour()
  const mn = s.minute()
  const sc = s.second()
  s.fill(255)
  s.noStroke()
  s.text(hr + ':' + mn + ':' + sc, 10, 200)
}
