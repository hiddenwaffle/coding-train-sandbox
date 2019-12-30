import { s, len } from './toothpicks'

export class Toothpick {
  constructor(x, y, d) {
    this.dir = d
    if (this.dir === 1) {
      this.ax = x - len / 2
      this.bx = x + len / 2
      this.ay = y
      this.by = y
    } else {
      this.ax = x
      this.bx = x
      this.ay = y - len / 2
      this.by = y  + len / 2
    }
  }

  intersects(x, y) {
    if (this.ax === x && this.ay === y) {
      return true
    } else if (this.bx === x && this.by === y) {
      return true
    } else {
      return false
    }
  }

  createA(others) {
    let available = true
    for (let other of others) {
      if (other !== this && other.intersects(this.ax, this.ay)) {
        available = false
        break // TODO: is this ok
      }
    }
    if (available) {
      return new Toothpick(this.ax, this.ay, this.dir * -1)
    } else {
      return null
    }
  }

  createB(others) {
    let available = true
    for (let other of others) {
      if (other !== this && other.intersects(this.bx, this.by)) {
        available = false
        break // TODO: is this ok
      }
    }
    if (available) {
      return new Toothpick(this.bx, this.by, this.dir * -1)
    } else {
      return null
    }
  }

  show() {
    s.stroke(0)
    s.strokeWeight(2)
    s.line(this.ax, this.ay, this.bx, this.by)
  }
}
