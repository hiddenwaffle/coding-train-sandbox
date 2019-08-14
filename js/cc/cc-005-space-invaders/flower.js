import s from './space-invaders-sketch'

export class Flower {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.d = 60
    this.xdir = 1
  }

  grow() {
    this.d *= 1.1
  }

  shiftDown() {
    this.xdir *= -1
    this.y += this.d / 2
  }

  move() {
    this.x += this.xdir
  }

  show() {
    s.fill('#ffa6c9dd')   // "Carnation pink"
    s.stroke('#fff3f7') // and a lighter version
    s.ellipse(this.x, this.y, this.d, this.d)
  }
}
