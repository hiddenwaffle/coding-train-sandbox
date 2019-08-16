import { s } from './metaballs'
import { Vector } from '../../handcar'

export class Blob {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = Vector.random2D()
    this.vel.mult(s.random(1, 2.5))
    this.r = 20
  }

  update() {
    this.pos.add(this.vel)
    if (this.pos.x > s.width || this.pos.x < 0) {
      this.pos.x -= this.vel.x
      this.vel.x *= -1
    }
    if (this.pos.y > s.height || this.pos.y < 0) {
      this.pos.y -= this.vel.y
      this.vel.y *= -1
    }
  }

  show() {
    s.noFill()
    s.stroke(0, 64)
    s.strokeWeight(4)
    s.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
  }
}
