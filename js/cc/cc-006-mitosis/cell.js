import s from './mitosis-sketch'
import { PVector } from '../../handcar'

export class Cell {
  constructor() {
    this.pos = new PVector(s.random(s.width), s.random(s.height))
    this.r = 20
  }

  move() {
    const vel = PVector.random2D()
    this.pos.add(vel)
  }

  show() {
    s.ellipse(this.pos.x, this.pos.y, this.r, this.r)
  }
}
