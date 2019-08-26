import { Vector } from '../../handcar'
import { s } from './raycasting-rendering'
import { Ray } from './ray'

const POV = 60

export class Particle {
  constructor() {
    this.pos = new Vector(s.width / 2, s.height / 2)
    this.rays = []
    for (let a = 0; a < POV; a += 1) {
      this.rays.push(new Ray(this.pos, s.radians(a)))
    }
    this.heading = 0
  }

  rotate(angle) {
    this.heading += angle
    for (let i = 0; i < POV; i++) {
      const ray = this.rays[i]
      ray.setAngle(s.radians(i + this.heading))
    }
  }

  forward(velocity) {
    // The "POV / 2" is because the heading is not centered,
    // which is good enough for this sketch.
    const diff = Vector.fromAngle(s.radians(this.heading + POV / 2))
    diff.mult(velocity)
    this.pos.add(diff)
    if (this.pos.x < 0 || this.pos.x >= s.width ||
        this.pos.y < 0 || this.pos.y >= s.height) {
      this.pos.sub(diff) // undo if out of bounds
    }
  }

  // TODO: unused?
  update(x, y) {
    if (x >= 0 && x < s.width && y >= 0 && y < s.height) {
      this.pos.set(x, y)
    }
  }

  look(walls) {
    const scene = []
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i]
      let record = Infinity
      let closest = null
      for (let wall of walls) {
        const pt = ray.cast(wall)
        if (pt) {
          const d = Vector.dist(this.pos, pt)
          if (d < record) {
            record = d
            closest = pt
          }
        }
      }
      if (closest) {
        s.stroke(255, 100)
        s.line(this.pos.x, this.pos.y, closest.x, closest.y)
      }
      scene[i] = record
    }
    return scene
  }

  show() {
    s.fill(255)
    s.ellipse(this.pos.x, this.pos.y, 16)
    for (let ray of this.rays) {
      ray.show()
    }
  }
}
