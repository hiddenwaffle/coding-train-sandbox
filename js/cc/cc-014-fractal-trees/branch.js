import s from './fractal-trees-sketch'
import { Vector } from '../../handcar'

export class Branch {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
  }

  show() {
    s.stroke(255)
    s.line(this.begin.x, this.begin.y, this.begin.x, this.end.y)
  }

  branch() {
    // const dir = new Vector()
    // const right = new Branch(this.begin.x, this.begin.y)
  }
}
