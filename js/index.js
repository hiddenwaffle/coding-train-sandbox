import { Sketch } from './railbike'
const q = new Sketch()

q.size(640, 360)
q.background(50)

q.draw = () => {
  q.stroke(255)
  q.line(q.pmouseX, q.pmouseY, q.mouseX, q.mouseY)
}

q.mousePressed = () => {
  q.background(50)
}

q.keyPressed = () => {
  q.background(0, 255, 0)
}
