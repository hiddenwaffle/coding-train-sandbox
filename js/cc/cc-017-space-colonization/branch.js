import s from './space-colonization-sketch'
import { Vector } from '../../handcar'

export class Branch {
  constructor(parent, pos, dir) {
    this.parent = parent
    this.pos = pos
    this.dir = dir
    this.origDir = dir.copy()
    this.count = 0
    this.len = 5
  }

  reset() {
    this.dir = this.origDir.copy()
    this.count = 0
  }

  next() {
    const nextDir = Vector.mult(this.dir, this.len)
    const nextPos = Vector.add(this.pos, nextDir)
    const nextBranch = new Branch(this, nextPos, this.dir.copy())
    return nextBranch
  }

  show() {
    if (this.parent != null) {
      s.stroke(255)
      s.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)
    }
  }
}
