import { Sketch, PVector } from '/handcar'
const q = new Sketch()

q.size(500, 300)

q.draw = () => {
  q.background(255)
  q.strokeWeight(2)
  q.stroke(0)
  q.noFill()

  q.translate(q.width / 2, q.height / 2)
  q.ellipse(0, 0, 4, 4)

  const mouse = new PVector(q.mouseX, q.mouseY)
  const center = new PVector(q.width / 2, q.height / 2)
  mouse.sub(center)
  mouse.mult(1.5)

  q.line(0, 0, mouse.x, mouse.y)
}