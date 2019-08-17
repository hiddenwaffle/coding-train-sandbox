import { s } from './flappy-bird'

export class Bird {
  constructor() {
    this.x = 128
    this.y = s.height / 2
    this.gravity = 0.6
    this.lift = -15
    this.velocity = 0
  }

  show() {
    s.fill(255)
    s.ellipse(this.x, this.y, 32, 32)
  }

  up() {
    this.velocity = this.lift
  }

  update() {
    this.velocity += this.gravity
    this.y += this.velocity
    if (this.y > s.height) {
      this.y = s.height
      this.velocity = 0
    }
    if (this.y < 0) {
      this.y = 0
      this.velocity = 0
    }
  }
}
