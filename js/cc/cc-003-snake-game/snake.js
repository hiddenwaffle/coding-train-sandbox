import s, { scl } from './snake-game-sketch'
import { PVector } from '../../handcar'

export class Snake {
  constructor() {
    this.x = 0
    this.y = 0
    this.xspeed = 1
    this.yspeed = 0
    this.tail = []
    this.digest = false
  }

  dir(x, y) {
    // Prevent turning into self
    if (this.tail.length > 0) {
      if (x == 1 && this.xspeed == -1) return
      if (x == -1 && this.xspeed == 1) return
      if (y == 1 && this.yspeed == -1) return
      if (y == -1 && this.yspeed == 1) return
    }
    // Finally do the update
    this.xspeed = x
    this.yspeed = y
  }

  eat(pos) {
    const d = s.dist(this.x, this.y, pos.x * scl, pos.y * scl)
    if (d < 1) {
      this.digest = true
      return true
    }
    return false
  }

  update() {
    // Tail
    if (this.digest) {
      this.digest = false
      this.tail.push(new PVector(this.x, this.y))
    } else {
      for (let i = 0; i < this.tail.length; i++) {
        if (i === this.tail.length - 1) {
          this.tail[i].x = this.x
          this.tail[i].y = this.y
        } else {
          this.tail[i].x = this.tail[i + 1].x
          this.tail[i].y = this.tail[i + 1].y
        }
      }
    }
    // Head
    this.x += this.xspeed * scl
    this.y += this.yspeed * scl
    this.x = s.constrain(this.x, 0, s.width - scl)
    this.y = s.constrain(this.y, 0, s.height - scl)
  }

  show() {
    s.fill(192)
    for (let t of this.tail) {
      s.rect(t.x, t.y, scl, scl)
    }
    s.fill(255)
    s.rect(this.x, this.y, scl, scl)
  }
}
