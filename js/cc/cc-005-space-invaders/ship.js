import s from './space-invaders-sketch'

export class Ship {
  constructor() {
    this.x = s.width / 2
  }

  move(dx) {
    this.x += dx
  }

  show() {
    s.fill(255)
    s.rect(this.x, s.height - 20, 20, 20)
  }
}
