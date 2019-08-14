import s from './space-invaders-sketch'

export class Drop {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.d = 8
  }

  show() {
    s.fill('#0077be')  // "Ocean Boat Blue"
    s.stroke('0ca4ff') // and a lighter version
    s.ellipse(this.x, this.y, this.d, this.d)
  }

  move() {
    this.y -= 5
  }

  hits(flowers) {
    for (let flower of flowers) {
      if (s.dist(this.x, this.y, flower.x, flower.y) <=
          this.d / 2 + flower.d / 2) {
        return flower
      }
    }
    return null
  }
}
