import { Vector } from '../../handcar'
import { s, c } from './black-hole-viz'

const dt = 0.1

export class Photon {
  constructor(x, y) {
    this.pos = new Vector(x, y)
    this.vel = new Vector(-c, 0)
    this.history = []
    this.stopped = false
  }

  stop() {
    this.stopped = true
  }

  update() {
    if (!this.stopped) {
      this.history.push(this.pos.copy())
      const deltaV = this.vel.copy()
      deltaV.mult(dt)
      this.pos.add(deltaV)
      if (this.history.length > 500) {
        this.history.splice(0, 1)
      }
    }
  }

  show() {
    s.strokeWeight(4)
    s.stroke(255, 0, 0)
    s.point(this.pos.x, this.pos.y)
    s.strokeWeight(2)
    s.noFill()
    s.beginShape()
    for (let v of this.history) {
      s.vertex(v.x, v.y)
    }
    s.endShape()
  }
}
