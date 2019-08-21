import { s } from './islamic-star-patterns'
import { Vector } from '../../handcar'

export class Hankin {
  constructor(a, v) {
    this.a = a
    this.v = v
    this.b = Vector.add(a, v)
  }

  show() {
    s.stroke(255, 0, 255)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
    s.fill(255)
    s.ellipse(this.a.x, this.a.y, 10, 10)
  }

  findEnd(other) {
    //
  }
}
