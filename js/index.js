import { Sketch, CENTER } from './railbike'

const q = new Sketch()
q.size(640, 360)

let x = 10

q.draw = () => {
  q.background(50)
  q.fill(150)
  q.stroke(255)
  q.rectMode(CENTER)
  q.rect(320, 180, 100, 50)
}
