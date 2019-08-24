import { s } from './forward-kinematics'
import { Vector } from '../../handcar'

export class Segment {
  constructor(x, y, len, angle) {
    this.a = new Vector(x, y)
    this.len = len
    this.angle = angle
    this.selfAngle = angle
    this.calculateB()
    this.child = null
    this.xoff = s.random(1000)
  }

  chain(len, angle) {
    if (!this.child) {
      this.child = new Segment(this.b.x, this.b.y, len, angle)
    } else {
      this.child.chain(len * 0.95, angle)
    }
  }

  calculateB() {
    const dx = this.len * s.cos(this.angle)
    const dy = this.len * s.sin(this.angle)
    this.b = new Vector(this.a.x + dx, this.a.y + dy)
  }

  wiggle() {
    const maxangle = 1
    const minangle = -1
    this.selfAngle = s.map(s.noise(this.xoff), 0, 1, maxangle, minangle)
    this.xoff += 0.004
    if (this.child) {
      this.child.wiggle()
    }
  }

  update(parentA, parentAngle) {
    this.angle = this.selfAngle
    if (parentA) {
      parentA.copyToRef(this.a)
    }
    if (parentAngle) {
      this.angle += parentAngle
    } else {
      this.angle += -s.PI / 2 // hack
    }
    this.angle += 0.01
    this.calculateB()
    if (this.child) {
      this.child.update(this.b, this.angle)
    }
  }

  show() {
    s.stroke(128, 192, 255, 128)
    s.strokeWeight(this.len)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
    if (this.child) {
      this.child.show()
    }
  }
}
