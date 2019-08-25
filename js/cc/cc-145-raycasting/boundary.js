import { Vector } from '../../handcar'
import { s } from './raycasting'

export class Boundary {
  constructor(x1, y1, x2, y2) {
    this.a = new Vector(x1, y1)
    this.b = new Vector(x2, y2)
  }

  show() {
    s.stroke(255)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
  }
}
