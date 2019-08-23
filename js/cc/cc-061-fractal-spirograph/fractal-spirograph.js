import { Sketch, Vector } from '../../handcar'
import { Orbit } from './orbit'
export const s = new Sketch()
s.size(600, 600)

// https://www.youtube.com/watch?v=0dwJ-bkJwDI

let path = []
export const resolution = 10

const sun = new Orbit(300, 300, 100, 0)
for (let _ = 0; _ < 5; _++) {
  sun.addGeneration()
}
const end = sun.youngest()

s.draw = () => {
  s.background(51)
  for (let _ = 0; _ < resolution; _++) {
    sun.update()
    path.push(new Vector(end.x, end.y))
    if (path.length > 4000) { // TODO: Base off of resolution?
      path.splice(0, 1)
    }
  }
  sun.show()
  s.stroke(96, 192, 255)
  s.strokeWeight(2)
  s.beginShape()
  for (let pos of path) {
    s.vertex(pos.x, pos.y)
  }
  s.endShape()
}
