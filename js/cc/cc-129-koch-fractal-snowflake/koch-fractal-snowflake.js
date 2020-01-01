import { Sketch, Vector } from '../../handcar'
import { Segment } from './segment'
export const s = new Sketch()
s.size(600, 750)

let segments = []
const a = new Vector(0, 100)
const b = new Vector(600, 100)
const c = new Vector(300, 600)
const s1 = new Segment(a, b)
const s2 = new Segment(b, c)
const s3 = new Segment(c, a)
segments.push(s1)
segments.push(s2)
segments.push(s3)

s.mousePressed = () => {
  const nextGeneration = []
  for (let s of segments) {
    const children = s.generate()
    nextGeneration.push(...children)
  }
  segments = nextGeneration
}

s.draw = () => {
  s.background(0)
  s.translate(0, 100)
  s.stroke(255)
  for (let s of segments) {
    s.show()
  }
}
