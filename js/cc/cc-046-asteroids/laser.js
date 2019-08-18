import { s } from './asteroids'
import { Vector } from '../../handcar'

export class Laser {
  constructor(pos, heading) {
    this.pos = pos.copy()
    this.vel = Vector.fromAngle(heading)
    this.vel.mult(15)
  }

  update() {
    this.pos.add(this.vel)
  }

  hits(asteroid) {
    return Vector.dist(this.pos, asteroid.pos) <= asteroid.r
  }

  offscreen() {
    if (this.pos.x < 0) return true
    if (this.pos.x > s.width) return true
    if (this.pos.y < 0) return true
    if (this.pos.y > s.height) return true
    return false
  }

  render() {
    s.ellipse(this.pos.x, this.pos.y, 4, 4)
  }
}
