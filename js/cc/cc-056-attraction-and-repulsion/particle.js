import { Vector } from '../../handcar'
import { s } from './attraction-and-repulsion'

export class Particle {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.prev = new Vector(x, y)
    this.vel = new Vector()
    this.acc = new Vector()
  }

  attracted(target) {
    const force = Vector.sub(target, this.pos)
    let dsquared = force.magSq()
    dsquared = s.constrain(dsquared, 5, 50)
    const G = 6.67408
    const strength = (G / dsquared) * 0.1
    force.setMag(strength)
    if (target.repels) force.mult(-1)
    this.acc.add(force)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  show() {
    s.stroke(255)
    s.strokeWeight(4)
    s.line(this.pos.x, this.pos.y, this.prev.x, this.prev.y)
    this.prev.x = this.pos.x
    this.prev.y = this.pos.y
  }
}
