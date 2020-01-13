import { Sketch } from '../../handcar'
import { Turtle } from './turtle'
export const s = new Sketch()
s.size(200, 200)

s.createP()
const editor = document.createElement('textarea')
editor.id = 'code'
editor.cols = 40
editor.rows = 5
editor.value = `fd 60 rt 120
pu
fd 60 rt 120
pd
fd 60 rt 120
`
setTimeout(() => { editor.focus() }, 1)
s.canvas.parentElement.appendChild(editor)

editor.addEventListener('input', goTurtle)
goTurtle()

function goTurtle() {
  s.background(0)
  s.pushMatrix()
  const turtle = new Turtle(100, 100, 0)
  const code = editor.value
  const tokens = code.replace(/\n/g, ' ').split(' ') // https://stackoverflow.com/a/17271549
  console.clear()
  console.table(tokens)
  let index = 0
  while (index < tokens.length) {
    const token = tokens[index] && tokens[index].trim()
    index++
    let amt
    switch (token) {
      case 'fd':
        amt = parseInt(tokens[index])
        index++
        turtle.forward(amt)
        break
      case 'bd':
        amt = parseInt(tokens[index])
        index++
        turtle.forward(-amt)
        break
      case 'rt':
        amt = parseInt(tokens[index])
        index++
        turtle.right(amt)
        break
      case 'lt':
        amt = parseInt(tokens[index])
        index++
        turtle.right(-amt)
        break
      case 'pu':
        turtle.pen = false
        break
      case 'pd':
        turtle.pen = true
        break
    }
  }
  s.popMatrix()
}
goTurtle()
