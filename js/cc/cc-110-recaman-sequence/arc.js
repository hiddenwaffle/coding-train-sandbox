import { s } from './recaman-sequence'

export class Arc {
  constructor(start, end, dir) {
    this.start = start
    this.end = end
    this.dir = dir
  }

  show() {
    const diameter = s.abs(this.end - this.start)
    const x = (this.end + this.start) / 2
    if (this.dir === 0) {
      s.arc(x, 0, diameter, diameter, s.PI, 0)
    } else {
      s.arc(x, 0, diameter, diameter, 0, s.PI)
    }
  }
}
