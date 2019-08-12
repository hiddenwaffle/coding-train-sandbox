import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=MkXoQVWRDJs

q.size(640, 360)

class Mover {
  constructor() {
    this.location = new PVector(q.width / 2, q.height / 2)
    this.velocity = new PVector()
    this.acceleration = new PVector()
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  edges() {
    if (this.location.x > q.width) {
      this.location.x = q.width
      this.velocity.x *= -1
    }
    if (this.location.x < 0) {
      this.location.x = 0
      this.velocity.x *= -1
    }
    if (this.location.y > q.height) {
      this.location.y = q.height
      this.velocity.y *= -1
    }
    if (this.location.y < 0) {
      this.location.y = 0
      this.velocity.y *= -1
    }
  }

  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(127)
    q.ellipse(this.location.x, this.location.y, 48, 48)
  }
}

const m = new Mover()

q.draw = () => {
  q.background(255)

  const gravity = new PVector(0, 0.3)
  m.applyForce(gravity)

  if (q.mousePressed) {
    const wind = new PVector(0.2, 0)
    m.applyForce(wind)
  }

  m.update()
  m.edges()
  m.display()
}
