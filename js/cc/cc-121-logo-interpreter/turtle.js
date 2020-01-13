import { s } from './logo-interpreter'

export class Turtle {
  constructor(x, y, angle) {
    s.translate(x, y)
    s.rotate(angle)
    this.pen = true
  }

  forward(amt) {
    if (this.pen) {
      s.stroke(255)
      s.strokeWeight(2)
      s.line(0, 0, amt, 0)
    }
    s.translate(amt, 0)
  }

  /**
   * Expects value in degrees
   */
  right(angle) {
    s.rotate(s.radians(angle))
  }
}
