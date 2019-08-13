import { Sketch } from '../handcar'
const s = new Sketch()

// let current = 'A'
// let count = 0

// s.size(600, 600)
// const ruleset = {
//   'F': 'FF+[+F-F-F]-[-F+F+F]'
// }
// const lsys = new LSystem('F', ruleset)
// const turtle = new Turtle(lsys.getSentence(), s.height / 3, s.radians(25))

// s.draw = () => {
//   s.background(255)
//   s.fill(0)
//   s.translate(s.width / 2, s.height)
//   s.rotate(-Math.PI / 2)
//   turtle.render()
//   s.noLoop()
// }

// let counter = 0

// s.mousePressed = () => {
//   if (counter < 5) {
//     s.pushMatrix()
//     lsys.generate()
//     turtle.setToDo(lsys.getSentence())
//     turtle.changeLen(0.5)
//     s.popMatrix()
//     s.redraw()
//     counter++
//   }
// }

let x = 25

s.draw = () => {
  s.background(255)
  s.fill(128)
  s.stroke(0)
  s.ellipse(x, 75, 50, 50)
  s.noLoop()
  console.log(x)
}

s.mousePressed = () => {
  x++
  s.redraw()
}
