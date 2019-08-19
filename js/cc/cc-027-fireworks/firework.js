import { s } from './fireworks'
import { Particle } from './particle'
import { Vector } from '../../handcar'

const gravity = new Vector(0, 0.1)

export class Firework {
  constructor(x, y) {
    this.hue = Math.floor(s.random(361))
    this.main = new Particle(x, y, new Vector(s.random(-0.1, 0.1),
                                              s.random(-9, -4)),
                                   4,
                                   this.hue)
    this.exploded = false
    this.particles = []
  }

  get completed() {
    return this.exploded && this.particles.length === 0
  }

  update() {
    if (!this.exploded) {
      this.main.applyForce(gravity)
      this.main.update()
      if (this.main.vel.y >= 1) {
        this.explode()
      }
    } else {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const particle = this.particles[i]
        particle.applyForce(gravity)
        particle.applyAirResistance()
        particle.update()
        particle.lifespan *= 0.98
        if (particle.lifespan < 10) {
          this.particles.splice(i, 1)
        }
      }
    }
  }

  explode() {
    this.exploded = true
    for (let i = 0; i < 100; i++) {
      const vel = Vector.random2D()
      vel.mult(s.random(1, 6))
      const particle = new Particle(this.main.pos.x,
                                    this.main.pos.y,
                                    vel,
                                    1,
                                    this.hue)
      particle.lifespan = 255
      this.particles.push(particle)
    }
  }

  show() {
    if (!this.exploded) {
      this.main.show()
    } else {
      for (let particle of this.particles) {
        particle.show(particle.lifespan)
      }
    }
  }
}
