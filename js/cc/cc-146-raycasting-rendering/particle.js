import { Vector } from '../../handcar'
import { s } from './raycasting-rendering'
import { Ray } from './ray'

const POV = 60

export class Particle {
  constructor() {
    this.pos = new Vector(s.width / 2, s.height / 2)
    this.rays = []
    for (let a = -POV / 2; a < POV / 2; a += 1) {
      this.rays.push(new Ray(this.pos, s.radians(a)))
    }
    this.heading = 0
  }

  rotate(angle) {
    this.heading += angle
    for (let a = -POV / 2; a < POV / 2; a += 1) {
      const index = a + POV / 2 // Because array start at zero
      const ray = this.rays[index]
      ray.setAngle(s.radians(a + this.heading))
    }
  }

  forward(velocity) {
    const diff = Vector.fromAngle(s.radians(this.heading))
    diff.mult(velocity)
    this.pos.add(diff)
    if (this.pos.x < 1) this.pos.x = 1
    if (this.pos.x > s.width - 1) this.pos.x = s.width - 2
    if (this.pos.y < 1) this.pos.y = 1
    if (this.pos.y > s.height - 1) this.pos.y = s.height - 2
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
          const a = ray.dir.heading() - this.heading
          let dproj = d * s.cos(a)
          if (dproj === 0) {
            dproj = d // TODO: Not sure why I have to do this; the video does not.
          }
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
