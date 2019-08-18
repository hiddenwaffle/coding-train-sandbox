import { s } from './asteroids'
import { Vector } from '../../handcar'

export class Ship {
  constructor() {
    this.pos = new Vector(s.width / 2, s.height / 2)
    this.r = 20
    this.heading = 0
    this.vel = new Vector()
    this.highlight = false
  }

  hits(asteroid) {
    return Vector.dist(this.pos, asteroid.pos) <= asteroid.r
  }

  update() {
    this.vel.mult(0.99)
    this.pos.add(this.vel)
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = s.width
    if (this.pos.x > s.width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = s.height
    if (this.pos.y > s.height) this.pos.y = 0
  }

  turn(angle) {
    this.heading += angle
  }

  boost() {
    const force = Vector.fromAngle(this.heading)
    force.mult(0.25)
    this.vel.add(force)
  }

  break() {
    this.vel.mult(0.85)
  }

  render() {
    s.pushMatrix()
    s.translate(this.pos.x, this.pos.y)
    s.rotate(this.heading + s.PI / 2)
    if (this.highlight) {
      s.stroke(255, 0, 0)
    }
    s.triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
    s.popMatrix()
  }
}
