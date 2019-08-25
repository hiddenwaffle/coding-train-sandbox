import { Vector } from '../../handcar'
import { s } from './raycasting-rendering'
import { Ray } from './ray'

export class Particle {
  constructor() {
    this.pos = new Vector(s.width / 2, s.height / 2)
    this.rays = []
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, s.radians(a)))
    }
  }

  update(x, y) {
    this.pos.set(x, y)
  }

  look(walls) {
    for (let ray of this.rays) {
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
    }
  }

  show() {
    s.fill(255)
    s.ellipse(this.pos.x, this.pos.y, 16)
    for (let ray of this.rays) {
      ray.show()
    }
  }
}
