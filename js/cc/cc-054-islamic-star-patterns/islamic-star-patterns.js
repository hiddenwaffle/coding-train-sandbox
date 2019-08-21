import { Sketch } from '../../handcar'
import { Polygon } from './polygon'
export const s = new Sketch()

// https://www.youtube.com/watch?v=sJ6pMLp_IaI

export let angle = 60
export let delta = 10

s.createP()
const deltaSlider = s.createSlider(0, 25, 1)
const angleSlider = s.createSlider(0, 90, 60)

s.size(400, 400)

const polys = []

const inc = 100
for (let x = 0; x < s.width; x += inc) {
  for (let y = 0; y < s.height; y += inc) {
    const poly = new Polygon()
    poly.addVertex(x, y)
    poly.addVertex(x + inc, y)
    poly.addVertex(x + inc, y + inc)
    poly.addVertex(x, y + inc)
    poly.close()
    polys.push(poly)
  }
}

s.draw = () => {
  s.background(51)
  angle = angleSlider.value()
  delta = deltaSlider.value()
  for (let poly of polys) {
    poly.hankin()
    poly.show()
  }
}
