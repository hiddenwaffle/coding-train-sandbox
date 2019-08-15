import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

s.createP('Angle')
const slider = s.createSlider(0, s.TWO_PI, Math.PI / 4, 0.01)

s.draw = () => {
  s.background(51)
  s.stroke(255)
  s.translate(200, s.height)
  branch(100, slider.value())
}

function branch(len, angle) {
  s.line(0, 0, 0, -len)
  if (len > 4) {
    s.translate(0, -len)
    s.pushMatrix()
    s.rotate(angle)
    branch(len * 0.67, angle)
    s.popMatrix()
    s.pushMatrix()
    s.rotate(-angle)
    branch(len * 0.67, angle)
    s.popMatrix()
  }
}
