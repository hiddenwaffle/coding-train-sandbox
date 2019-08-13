import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=ofwmvH95Hdo

q.size(600, 360)

q.draw = () => {
  q.background(255)
  const a = new PVector(20, 300)
  const b = new PVector(500, 250)
  const mouse = new PVector(q.mouseX, q.mouseY)
  q.stroke(0)
  q.strokeWeight(2)
  q.line(a.x, a.y, b.x, b.y)
  q.line(a.x, a.y, mouse.x, mouse.y)
  q.fill(0)
  q.ellipse(a.x, a.y, 8, 8)
  q.ellipse(b.x, b.y, 8, 8)
  q.ellipse(mouse.x, mouse.y, 8, 8)
  const norm = scalarProjection(mouse, a, b)
  q.strokeWeight(1)
  q.stroke(50)
  q.line(mouse.x, mouse.y, norm.x, norm.y)
  q.noStroke()
  q.fill(255, 0, 0)
  q.ellipse(norm.x, norm.y, 16, 16)
}

function scalarProjection(p, a, b) {
  const ap = PVector.sub(p, a)
  const ab = PVector.sub(b, a)
  ab.normalize()
  ab.mult(ap.dot(ab))
  const normalPoint = PVector.add(a, ab)
  return normalPoint
}
