import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

s.createP('a')
const slider1 = s.createSlider(0, 200, 100)
s.createP('b')
const slider2 = s.createSlider(0, 200, 100)
s.createP('n')
const slider3 = s.createSlider(0, 10, 2, 0.01)

s.draw = () => {
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  const a = slider1.value()
  const b = slider2.value()
  const n = slider3.value()
  s.stroke(255)
  s.noFill()
  s.beginShape()
  for (let angle = 0; angle < s.TWO_PI; angle += 0.1) {
    const na = 2 / n
    const x = Math.pow(Math.abs(Math.cos(angle)), na) * a * sgn(Math.cos(angle))
    const y = Math.pow(Math.abs(Math.sin(angle)), na) * b * sgn(Math.sin(angle))
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
}

function sgn(n) {
  if (n < 0) {
    return -1
  } else if (n > 0) {
    return 1
  } else {
    return 0
  }
}
