import { Vector } from '../../handcar'
import { s } from './brownian-tree-snowflake'

export class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.r = 3
  }

  update() {
    this.pos.x -= 1
    this.pos.y += s.random(-3, 3)
    const angle = s.constrain(this.pos.heading(), 0, s.PI / 6)
    const magnitude = this.pos.mag()
    this.pos = Vector.fromAngle(angle)
    this.pos.setMag(magnitude)
  }

  show() {
    s.fill(255)
    s.stroke(255)
    s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }

  intersects(snowflake) {
    let result = false
    for (let p of snowflake) {
      const d = s.dist(p.pos.x, p.pos.y, this.pos.x, this.pos.y)
      if (d < this.r * 2) {
        result = true
        break
      }
    }
    return result
  }

  finished() {
    return this.pos.x < 1
  }
}
