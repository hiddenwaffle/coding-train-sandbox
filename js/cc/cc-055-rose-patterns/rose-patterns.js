import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

const pN = s.createP()
const sliderN = s.createSlider(1, 10, 5, 0.2)
const pD = s.createP()
const sliderD = s.createSlider(1, 10, 5)

s.draw = () => {
  const d = sliderD.value()
  pD.value(`D: ${d}`)
  const n = sliderN.value()
  pN.value(`N: ${n}`)
  const k = n / d
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  s.stroke(255)
  s.noFill()
  s.beginShape()
  for (let a = 0; a < s.TWO_PI * d; a += 0.02) {
    const r = 200 * s.cos(k * a)
    const x = r * s.cos(a)
    const y = r * s.sin(a)
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
}
