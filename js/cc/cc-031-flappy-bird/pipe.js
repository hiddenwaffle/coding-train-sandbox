import { s } from './flappy-bird'

export class Pipe {
  constructor() {
    this.top = s.random(s.height / 2)
    this.bottom = s.random(s.height / 2)
    this.x = s.width
    this.w = 20
    this.speed = 2
    this.highlight = false
  }

  hits(bird) {
    if (bird.y < this.top ||
        bird.y > s.height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true
        return true
      } else {
        this.highlight = false
      }
    }
  }

  show() {
    if (this.highlight) {
      s.fill(255, 0, 0)
    } else {
      s.fill(255)
    }
    s.rect(this.x, 0, this.w, this.top)
    s.rect(this.x, s.height - this.bottom, this.w, this.bottom)
  }

  update() {
    this.x -= this.speed
  }

  offscreen() {
    return this.x < -this.w
  }
}
