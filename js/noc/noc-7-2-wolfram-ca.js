import { Sketch } from '../handcar'
const q = new Sketch()
q.size(640, 800)

// https://www.youtube.com/watch?v=W1zKu3fDQR8

class CA {
  constructor(ruleset) {
    this.ruleset = ruleset
    this.w = 5
    this.cells = []
    for (let i = 0; i < Math.floor(q.width / this.w); i++) {
      this.cells[i] = 0
    }
    this.cells[Math.floor(this.cells.length / 2)] = 1
    this.generation = 0
  }

  generate() {
    const nextgen = []
    for (let i = 1; i < this.cells.length - 1; i++) {
      const left  = this.cells[i - 1]
      const me    = this.cells[i]
      const right = this.cells[i + 1]
      nextgen[i] = this.rules(left, me, right)
    }
    nextgen[this.cells.length - 1] = 0 // Make sure end also lives to next gen
    this.cells = nextgen
    this.generation++
  }

  display() {
    for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i] == 1) q.fill(0)
      else q.fill(255)
      q.noStroke()
      q.rect(i * this.w, this.generation * this.w, this.w, this.w)
    }
  }

  rules(a, b, c) {
    if (a == 1 && b == 1 && c == 1) return ruleset[0]
    if (a == 1 && b == 1 && c == 0) return ruleset[1]
    if (a == 1 && b == 0 && c == 1) return ruleset[2]
    if (a == 1 && b == 0 && c == 0) return ruleset[3]
    if (a == 0 && b == 1 && c == 1) return ruleset[4]
    if (a == 0 && b == 1 && c == 0) return ruleset[5]
    if (a == 0 && b == 0 && c == 1) return ruleset[6]
    if (a == 0 && b == 0 && c == 0) return ruleset[7]
    return 0
  }
}

// TODO: q.frameRate(24)
// const ruleset = [1, 1, 0, 1, 1, 1, 1, 0] // rule 222
// const ruleset = [1, 0, 1, 1, 1, 1, 1, 0] // rule 190
// const ruleset = [0, 0, 0, 1, 1, 1, 1, 0] // rule 30
// const ruleset = [0, 1, 1, 0, 1, 1, 1, 0] // rule 110
const ruleset = [0, 1, 0, 1, 1, 0, 1, 0] // rule 90
const ca = new CA(ruleset)

q.draw = () => {
  ca.display()
  ca.generate()
}
