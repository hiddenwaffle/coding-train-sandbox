import { s } from './agar.io'
import { Vector } from '../../handcar'

export class Blob {
  constructor(x, y, r) {
    this.pos = new Vector(x, y)
    this.r = r
    this.vel = new Vector()
  }

  update() {
    const newvel = new Vector(s.mouseX - s.width / 2,
                              s.mouseY - s.height / 2)
    newvel.setMag(3)
    this.vel.lerp(newvel, 0.1)
    this.pos.add(this.vel)
  }

  eats(other) {
    const d = Vector.dist(this.pos, other.pos)
    if (d < this.r + other.r * 0.2) {
      const area = s.PI * this.r * this.r + s.PI * other.r * other.r
      this.r = s.sqrt(area / s.PI)
      return true
    } else {
      return false
    }
  }

  show() {
    s.fill(255)
    s.ellipse(s.floor(this.pos.x), s.floor(this.pos.y), this.r * 2, this.r * 2)
  }
}
