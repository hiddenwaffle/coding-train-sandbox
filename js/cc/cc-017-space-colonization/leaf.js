import s from './space-colonization-sketch'
import { Vector } from '../../handcar'

export class Leaf {
  constructor() {
    this.pos = new Vector(s.random(s.width),
                          s.random(s.height) - 100)
    this.reached = false
  }

  show() {
    s.fill(255)
    s.noStroke()
    s.ellipse(this.pos.x, this.pos.y, 4, 4)
  }
}
