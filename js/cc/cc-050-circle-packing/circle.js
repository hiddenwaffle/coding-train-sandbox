import { s } from './circle-packing'

export class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.r = 1
    this.growing = true
  }

  grow() {
    if (this.growing) this.r += 0.5
  }

  edges() {
    return this.x + this.r > s.width ||
           this.x - this.r < 0 ||
           this.y + this.r > s.height ||
           this.y - this.r < 0
  }

  show() {
    s.stroke(255)
    s.strokeWeight(2)
    s.noFill()
    s.ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }
}
