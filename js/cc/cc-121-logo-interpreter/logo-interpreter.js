import { Sketch } from '../../handcar'
import { Turtle } from './turtle'
export const s = new Sketch()
s.size(200, 200)

const commands = {
  'fd': (turtle, amt) => {
    turtle.forward(amt)
  },
  'bd': (turtle, amt) => {
    turtle.forward(-amt)
  },
  'rt': (turtle, amt) => {
    turtle.right(amt)
  },
  'lt': (turtle, amt) => {
    turtle.right(-amt)
  }
}

s.createP()
const editor = document.createElement('textarea')
editor.id = 'code'
editor.cols = 40
editor.rows = 5
editor.value = 'fd 60 rt 120 fd 60 rt 120 fd 60 rt 120'
setTimeout(() => { editor.focus() }, 1)
s.canvas.parentElement.appendChild(editor)

editor.addEventListener('input', goTurtle)
goTurtle()

function goTurtle() {
  s.background(0)
  s.pushMatrix()
  const turtle = new Turtle(100, 100, 0)
  const code = editor.value
  const tokens = code.split(' ')
  let index = 0
  while (index < tokens.length) {
    const token = tokens[index]
    const amt = parseInt(tokens[index + 1])
    if (commands[token]) {
      commands[token](turtle, amt)
    }
    index += 2
  }
  s.popMatrix()
}
goTurtle()
