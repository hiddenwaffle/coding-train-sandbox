import { s, cols, scl } from './flow-field'
import { Vector } from '../../handcar'

export class Particle {
  constructor() {
    this.pos = new Vector(Math.floor(s.random(s.width)),
                          Math.floor(s.random(s.height)))
    this.prevPos = this.pos.copy()
    this.vel = new Vector()
    this.acc = new Vector()
    this.maxspeed = 2
    this.color = s.color(0,
                         Math.floor(s.random(256)),
                         Math.floor(s.random(256)),
                         5)
  }

  follow(vectors) {
    const x = Math.floor(this.pos.x / scl)
    const y = Math.floor(this.pos.y / scl)
    const index = x + y * cols
    const force = vectors[index]
    this.applyForce(force)
  }

  update() {
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
    this.vel.add(this.acc)
    this.vel.limit(this.maxspeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  edges() {
    if (this.pos.x > s.width) {
      this.pos.x = 0
      this.prevPos.x = 0
    }
    if (this.pos.x < 0) {
      this.pos.x = s.width - 1
      this.prevPos.x = s.width - 1
    }
    if (this.pos.y > s.height) {
      this.pos.y = 0
      this.prevPos.y = 0
    }
    if (this.pos.y < 0) {
      this.pos.y = s.height - 1
      this.prevPos.y = s.height - 1
    }
  }

  applyForce(force) {
    this.acc.add(force)
  }

  show() {
    s.stroke(this.color)
    s.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    // s.point(this.pos.x, this.pos.y)
  }
}
