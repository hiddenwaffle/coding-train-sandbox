import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=7eBLAgT0yUs

class Mover {
  constructor() {
    this.location = new PVector(q.width / 2, q.height / 2)
    this.velocity = new PVector()
    this.acceleration = new PVector()
  }

  update() {
    const mouse = new PVector(q.mouseX, q.mouseY)
    mouse.sub(this.location)
    mouse.setMag(0.1)
    this.acceleration = mouse

    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.velocity.limit(5)
  }

  edges() {
    if (this.location.x > q.width) this.location.x = 0
    if (this.location.x < 0) this.location.x = q.width
    if (this.location.y > q.height) this.location.y = 0
    if (this.location.y < 0) this.location.y = q.height
  }

  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(127)
    q.ellipse(this.location.x, this.location.y, 48, 48)
  }
}

q.size(640, 360)
const m = new Mover()

q.draw = () => {
  q.background(255)
  m.update()
  // m.edges()
  m.display()
}
