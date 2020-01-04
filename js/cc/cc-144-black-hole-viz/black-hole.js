import { Vector } from '../../handcar'
import { s, c, G } from './black-hole-viz'

export class Blackhole {
  constructor(x, y, m) {
    this.pos = new Vector(x, y)
    this.mass = m
    this.rs = (2 * G * this.mass) / (c * c)
  }

  pull(photon) {
    const force = Vector.sub(this.pos, photon.pos)
    const r = force.mag()
    const fg = G * this.mass / (r * r)
    force.setMag(fg)
    photon.vel.add(force)
    photon.vel.setMag(c)

    if (r < this.rs * 3) {
      photon.stop()
    }
  }

  show() {
    s.fill(0)
    s.noStroke()
    s.ellipseMode(s.RADIUS)
    s.ellipse(this.pos.x, this.pos.y, this.rs * 3)
    // Accretion disk
    s.noFill()
    s.stroke(255, 150, 0, 100)
    s.strokeWeight(32)
    s.ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32)
    s.stroke(100, 100)
    s.strokeWeight(64)
    s.ellipse(this.pos.x, this.pos.y, this.rs * 6 + 64)
  }
}
