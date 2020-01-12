import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(600, 600)

s.createP()
const slider = s.createSlider(0, 10, 5, 0.1)
let phase = 0
let zoff = 0

s.draw = () => {
  s.noiseSeed(99)
  s.background(0)
  s.translate(s.width / 2, s.height / 2)
  s.stroke(255)
  s.noFill()
  s.beginShape()
  let noiseMax = slider.value()
  for (let a = 0; a < s.TWO_PI; a += 0.03) {
    let xoff = s.map(s.cos(a + phase), -1, 1, 0, noiseMax)
    let yoff = s.map(s.sin(a), -1, 1, 0, noiseMax)
    const r = s.map(s.noise(xoff, yoff, zoff), 0, 1, 100, 200)
    const x = r * s.cos(a)
    const y = r * s.sin(a)
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
  zoff += 0.1
  // phase = 0.05
}
