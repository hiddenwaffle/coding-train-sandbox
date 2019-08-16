import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

const angle = s.radians(25)
const axiom = 'F'
let sentence = axiom
let len = 100
const rule = {
  'F': 'FF+[+F-F-F]-[-F+F+F]'
}
s.createP()
const button = s.createButton('generate')
s.createP(axiom)
button.mousePressed(generate)
turtle()

function turtle() {
  s.resetMatrix()
  s.background(51)
  s.translate(s.width / 2, s.height)
  s.stroke(64, 255, 128, 100)
  s.pushMatrix()
  for (let c of sentence) {
    switch (c) {
      case 'F':
        s.line(0, 0, 0, -len)
        s.translate(0, -len)
        break
      case '+':
        s.rotate(angle)
        break
      case '-':
        s.rotate(-angle)
        break
      case '[':
        s.pushMatrix()
        break
      case ']':
        s.popMatrix()
    }
  }
}

function generate() {
  len *= 0.5
  let next = ''
  for (let c of sentence) {
    const value = rule[c]
    if (value) {
      next = `${next}${value}`
    } else {
      next = `${next}${c}`
    }
  }
  sentence = next
  s.createP(sentence)
  turtle()
}
