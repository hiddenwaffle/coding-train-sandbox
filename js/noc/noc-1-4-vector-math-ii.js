import { Sketch, Vector } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=uHusbFmq-4I

q.size(500, 300)

q.draw = () => {
  q.background(255)
  q.strokeWeight(2)
  q.stroke(0)
  q.noFill()

  q.translate(q.width / 2, q.height / 2)
  q.ellipse(0, 0, 4, 4)

  const mouse = new Vector(q.mouseX, q.mouseY)
  const center = new Vector(q.width / 2, q.height / 2)
  mouse.sub(center)
  mouse.mult(0.1)

  // const m = mouse.mag()
  // q.fill(255, 0, 0)
  // q.rect(0, 0, m, 20)

  // mouse.normalize()
  // mouse.mult(50)

  mouse.setMag(50)

  q.line(0, 0, mouse.x, mouse.y)
}
