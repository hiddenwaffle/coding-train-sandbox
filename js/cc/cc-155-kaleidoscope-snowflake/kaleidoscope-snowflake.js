import { Sketch } from '../../handcar'
const s = new Sketch()

const symmetry = 6
const angle = 360 / symmetry

s.size(600, 600)
s.background(0)

s.createP('')

const clearButton = s.createButton('clear')
clearButton.mousePressed(clearCanvas)
function clearCanvas() {
  s.background(0)
}

const slider = s.createSlider(1, 32, 4, 0.1)

let xoff = 0
const rgb = [255, 255, 255]

s.draw = () => {
  s.translate(s.width / 2, s.height / 2)
  if (s.mouseX > 0 && s.mouseX < s.width && s.mouseY > 0 && s.mouseY < s.height) {
    const mx = s.mouseX - s.width / 2
    const my = s.mouseY - s.height / 2
    const pmx = s.pmouseX - s.width / 2
    const pmy = s.pmouseY - s.height / 2
    if (s.mousePressed) {
      const hu = s.map(s.sin(xoff), -1, 1, 0, 360)
      xoff += 0.1
      s.HSVtoRGB(hu, 255, 255, rgb)
      s.stroke(rgb[0], rgb[1], rgb[2], 100)
      for (let i = 0; i < symmetry; i++) {
        s.rotate(s.radians(angle))
        // const d = s.dist(mx, my, pmx, pmy)
        // const sw = s.map(d, 0, 18, 18, 2)
        const sw = slider.value()
        s.strokeWeight(sw)
        s.line(mx, my, pmx, pmy)
        s.pushMatrix()
        s.scale(1, -1)
        s.line(mx, my, pmx, pmy)
        s.popMatrix()
      }
    }
  }
}
