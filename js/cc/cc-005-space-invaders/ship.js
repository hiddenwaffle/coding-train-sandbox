import s from './space-invaders-sketch'

export class Ship {
  constructor() {
    this.x = s.width / 2
  }

  show() {
    s.fill(255)
    s.stroke(192)
    s.rectMode(s.CENTER)
    s.rect(this.x, s.height - 20, 20, 40)
  }

  move(dx) {
    this.x += dx * 5
  }
}
