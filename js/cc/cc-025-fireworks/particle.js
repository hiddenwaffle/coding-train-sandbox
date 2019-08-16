import { s } from './fireworks'
import { Vector } from '../../handcar'

// Scratch
const rgb = [0, 0, 0]

export class Particle {
  constructor(x, y, vel, size, hue) {
    this.pos = new Vector(x, y)
    this.vel = vel
    this.acc = new Vector()
    this.size = size
    s.HSVtoRGB(hue, 99, 99, rgb)
    this.r = rgb[0]
    this.g = rgb[1]
    this.b = rgb[2]
  }

  applyForce(force) {
    this.acc.add(force)
  }

  applyAirResistance() {
    this.vel.mult(0.975)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  show(alpha=255) {
    s.fill(this.r, this.g, this.b, Math.floor(alpha))
    s.ellipse(this.pos.x, this.pos.y, 4, this.size)
  }
}
