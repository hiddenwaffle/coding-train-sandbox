import { Vector } from '../../handcar'
import { s } from './fixed-point'

export class Segment {
  constructor(x, y, len, i) { // expects i to be 1 to 20
    this.a = new Vector(x, y)
    this.len = len
    this.sw = s.map(i, 1, 20, 20, 1)
    this.angle = 0
    this.b = new Vector()
    this.child = null
    this.calculateB()
  }

  chain(len, angle) {
    if (this.child) {
      this.child.chain(len, angle)
    } else {
      this.child = new Segment(this.b.x, this.b.y, len, angle)
    }
  }

  follow(tx, ty) {
    const target = new Vector(tx, ty)
    const dir = Vector.sub(target, this.a)
    this.angle = dir.heading()
    dir.setMag(this.len)
    dir.mult(-1)
    this.a = Vector.add(target, dir)
    if (this.child) {
      this.child.follow(this.a.x, this.a.y)
    }
  }

  calculateB() {
    const dx = this.len * s.cos(this.angle)
    const dy = this.len * s.sin(this.angle)
    this.b.set(this.a.x + dx, this.a.y + dy)
    if (this.child) {
      this.child.calculateB()
    }
  }

  update() {
    this.calculateB()
    if (this.child) {
      this.child.update()
    }
  }

  show() {
    s.stroke(255)
    s.strokeWeight(this.sw)
    s.line(this.a.x, this.a.y, this.b.x, this.b.y)
    if (this.child) {
      this.child.show()
    }
  }
}
