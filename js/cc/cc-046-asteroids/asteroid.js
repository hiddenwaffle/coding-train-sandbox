import { s } from './asteroids'
import { Vector } from '../../handcar'

export class Asteroid {
  constructor(pos, r) {
    this.pos = pos || new Vector(s.random(s.width), s.random(s.height))
    this.vel = Vector.random2D()
    this.r = r || s.floor(s.random(15, 50))
    this.total = s.floor(s.random(5, 15))
    this.offset = []
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = s.random(-5, 5)
    }
  }

  breakup() {
    const a = new Asteroid(this.pos.copy(), this.r / 2)
    const b = new Asteroid(this.pos.copy(), this.r / 2)
    return [a, b]
  }

  update() {
    this.pos.add(this.vel)
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = s.width
    if (this.pos.x > s.width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = s.height
    if (this.pos.y > s.height) this.pos.y = 0
  }

  render() {
    s.pushMatrix()
    s.translate(this.pos.x, this.pos.y)
    s.beginShape()
    for (let i = 0; i < this.total; i++) {
      const angle = s.map(i, 0, this.total, 0, s.TWO_PI)
      const r = (this.r + this.offset[i])
      const x = r * s.cos(angle)
      const y = r * s.sin(angle)
      s.vertex(x, y)
    }
    s.endShape(s.CLOSE)
    s.popMatrix()
  }
}
