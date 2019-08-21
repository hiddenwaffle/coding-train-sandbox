import { s } from './islamic-star-patterns'
import { Vector } from '../../handcar'

export class Hankin {
  constructor(a, v) {
    this.a = a
    this.v = v
    this.b = Vector.add(a, v)
    this.end = null
    this.prevD = null
  }

  show() {
    s.stroke(128, 192, 255)
    s.line(this.a.x, this.a.y, this.end.x, this.end.y)
  }

  findEnd(other) {
    const den = other.v.y * this.v.x -
                other.v.x * this.v.y
    if (!den) {
      return
    }
    const numa = other.v.x * (this.a.y - other.a.y) -
                 other.v.y * (this.a.x - other.a.x)
    const numb = this.v.x * (this.a.y - other.a.y) -
                 this.v.y * (this.a.x - other.a.x)
    const ua = numa / den
    const ub = numb / den
    const x = this.a.x + ua * this.v.x
    const y = this.a.y + ua * this.v.y

    if (ua > 0 && ub > 0) {
      const candidate = new Vector(x, y)
      const d1 = Vector.dist(candidate, this.a)
      const d2 = Vector.dist(candidate, other.a)
      const d = d1 + d2
      const diff = s.abs(d1 - d2)
      if (diff < 0.001) { // Prevents "glitches" when they are equal
        if (!this.end) {
          this.end = candidate
          this.prevD = d
        } else if (d < this.prevD) {
          this.end = candidate
          this.prevD = d
        }
      }
    }
  }
}
