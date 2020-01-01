import { Vector } from '../../handcar'
import { s } from './koch-fractal-snowflake'

export class Segment {
  constructor(a, b) {
    this.a = a.copy()
    this.b = b.copy()
  }

  generate() {
    const children = []
    const v = Vector.sub(this.b, this.a)
    v.div(3)
    // Segment 1
    const b1 = Vector.add(this.a, v)
    children[0] = new Segment(this.a, b1)
    // Segment 4
    const a1 = Vector.sub(this.b, v)
    children[3] = new Segment(a1, this.b)
    v.rotate(-s.PI / 3)
    const c = Vector.add(b1, v)
    // Segment 2
    children[1] = new Segment(b1, c)
    // Segment 3
    children[2] = new Segment(c, a1)
    return children
  }

  show() {
    s.stroke(255)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}
