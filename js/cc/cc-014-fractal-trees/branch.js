import s from './fractal-trees-sketch'
import { Vector } from '../../handcar'

export class Branch {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
    this.finished = false
  }

  jitter() {
    this.end.x += s.random(-1, 1)
    this.end.y += s.random(-1, 1)
  }

  show() {
    s.stroke(255)
    s.line(this.begin.x, this.begin.y, this.end.x, this.end.y)
  }

  branchA() {
    const dir = Vector.sub(this.end, this.begin)
    dir.rotate(Math.PI / 6)
    dir.mult(0.67)
    const newEnd = Vector.add(this.end, dir)
    const right = new Branch(this.end, newEnd)
    return right
  }

  branchB() {
    const dir = Vector.sub(this.end, this.begin)
    dir.rotate(-Math.PI / 6)
    dir.mult(0.67)
    const newEnd = Vector.add(this.end, dir)
    const left = new Branch(this.end, newEnd)
    return left
  }
}
