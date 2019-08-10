import { Sketch } from './railbike'
const q = new Sketch()

q.size(640, 360)

q.draw = () => {
  q.background(50)

  q.fill(255)
  q.ellipse(0, 180, 24, 24)
}

// q.size(640, 360)
// q.background(50)

// q.draw = () => {
//   q.stroke(255)
//   q.line(q.pmouseX, q.pmouseY, q.mouseX, q.mouseY)
// }

// q.mousePressed = () => {
//   if (q.keyPressed) {
//     q.background(50)
//   } else {
//     q.background(225)
//   }
// }

// q.keyPressed = () => {
//   q.background(0, 255, 0)
// }
