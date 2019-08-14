import { Sketch, PVector } from '../handcar'
const q = new Sketch()
q.size(800, 300)

// https://www.youtube.com/watch?v=_BOtJncHCVA

class KochLine {
  constructor(a, b) {
    this.start = a.copy()
    this.end = b.copy()
  }

  display() {
    q.stroke(0)
    q.line(this.start.x, this.start.y, this.end.x, this.end.y)
  }

  kochA() {
    return this.start.copy()
  }

  kochB() {
    const v = PVector.sub(this.end, this.start)
    v.div(3)
    v.add(this.start)
    return v
  }

  kochC() {
    const a = this.start.copy()
    const v = PVector.sub(this.end, this.start)
    v.div(3)
    a.add(v)
    v.rotate(-q.radians(60))
    a.add(v)
    return a
  }

  kochD() {
    const v = PVector.sub(this.end, this.start)
    v.mult(2/3)
    v.add(this.start)
    return v
  }

  kochE() {
    return this.end.copy()
  }
}

q.background(255)
let lines = []
const alphaStart = new PVector(0, q.height - 50)
const alphaEnd = new PVector(q.width, q.height - 50)
lines.push(new KochLine(alphaStart, alphaEnd))

q.draw = () => {
  q.background(255)
  q.strokeWeight(2)
  for (let l of lines) {
    l.display()
  }
}

q.keyTyped = (keyCode) => {
  if (keyCode === q.SPACE) {
    const next = []
    for (let l of lines) {
      const a = l.kochA()
      const b = l.kochB()
      const c = l.kochC()
      const d = l.kochD()
      const e = l.kochE()
      next.push(new KochLine(a, b))
      next.push(new KochLine(b, c))
      next.push(new KochLine(c, d))
      next.push(new KochLine(d, e))
    }
    lines = next
    console.log(lines.length)
  }
}
