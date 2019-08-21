import { s, angle, delta } from './islamic-star-patterns'
import { Vector } from '../../handcar'
import { Hankin } from './hankin'

export class Edge {
  constructor(a, b) {
    this.a = a
    this.b = b
    this.h1
    this.h2
  }

  show() {
    s.stroke(255, 5)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
    if (this.h1) this.h1.show()
    if (this.h2) this.h2.show()
  }

  hankin() {
    const mid = Vector.add(this.a, this.b)
    mid.mult(0.5)
    const v1 = Vector.sub(this.a, mid)
    const v2 = Vector.sub(this.b, mid)
    let offset1 = mid
    let offset2 = mid
    if (delta > 0) {
      v1.setMag(delta)
      v2.setMag(delta)
      offset1 = Vector.add(mid, v2)
      offset2 = Vector.add(mid, v1)
    }
    v1.normalize()
    v2.normalize()
    v1.rotate(s.radians(-angle))
    v2.rotate(s.radians(angle))
    this.h1 = new Hankin(offset1, v1)
    this.h2 = new Hankin(offset2, v2)
  }

  findEnds(edge) {
    this.h1.findEnd(edge.h1)
    this.h1.findEnd(edge.h2)
    this.h2.findEnd(edge.h1)
    this.h2.findEnd(edge.h2)
  }
}
