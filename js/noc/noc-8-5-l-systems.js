import { Sketch } from '../handcar'
const s = new Sketch()
s.size(600, 600)

// https://www.youtube.com/watch?v=f6ra024-ASY

class LSystem {
  constructor(sentence, ruleset) {
    this.sentence = sentence
    this.ruleset = ruleset
  }

  generate() {
    let next = ''
    for (let c of this.sentence) {
      const result = this.ruleset[c]
      if (result) {
        next += result
      } else {
        next += c
      }
    }
    this.sentence = next
  }
}

class Turtle {
  constructor(todo, len, theta) {
    this.todo = todo
    this.len = len
    this.theta = theta
  }

  render() {
    s.stroke(0, 175)
    for (let c of this.todo) {
      switch (c) {
        case 'F':
        case 'G':
          s.line(0, 0, this.len, 0)
          s.translate(this.len, 0)
          break
        case '+':
          s.rotate(this.theta)
          break
        case '-':
          s.rotate(-this.theta)
          break
        case '[':
          s.pushMatrix()
          break
        case ']': {
          s.popMatrix()
          break
        }
      }
    }
  }

  changeLen(pct) {
    this.len *= pct
  }
}

const ruleset = {
  'F': 'FF+[+F-F-F]-[-F+F+F]'
}
const lsys = new LSystem('F', ruleset)
const turtle = new Turtle(lsys.sentence, s.height / 3, s.radians(25))

s.draw = () => {
  s.background(255)
  s.fill(0)
  s.translate(s.width / 2, s.height)
  s.rotate(-Math.PI / 2)
  turtle.render()
  s.noLoop()
}

let counter = 0

s.mousePressed = () => {
  if (counter < 5) {
    s.pushMatrix()
    lsys.generate()
    turtle.todo = lsys.sentence
    turtle.changeLen(0.5)
    s.popMatrix()
    s.redraw()
    counter++
  }
}
