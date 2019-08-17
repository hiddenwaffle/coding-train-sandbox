import { s } from './traveling-salesperson'
import { Vector } from '../../handcar'

export class City {
  constructor() {
    this.id = s.floor(s.random(Number.MAX_SAFE_INTEGER))
    this.pos = new Vector(s.random(s.width),
                          s.random(s.height))
    this.distances = new Map()
  }

  dist(otherId) {
    return this.distances.get(otherId)
  }

  computeDistances(others) {
    for (let other of others) {
      if (other !== this) {
        const d = Vector.dist(this.pos, other.pos)
        this.distances.set(other.id, d)
      }
    }
  }

  show() {
    s.stroke(255)
    s.fill(192)
    s.ellipse(this.pos.x, this.pos.y, 16, 16)
  }
}
