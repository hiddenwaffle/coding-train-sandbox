import s from './star-field-sketch'

export class Star {
  constructor() {
    this.x = s.random(0, s.width)
    this.y = s.random(0, s.height)
    this.z = s.random(0, s.width)
  }

  update() {
  }

  show() {
    s.fill(255)
    s.noStroke()
    s.ellipse(this.x, this.y, 8, 8)
  }
}
