import { Sketch, PVector } from '../handcar'
const q = new Sketch()

q.size(640, 360)

class Mover {
  constructor() {
    this.location = new PVector(q.random(q.width), 0)
    this.velocity = new PVector()
    this.acceleration = new PVector()
    this.mass = q.random(0.5, 4)
  }

  applyForce(force) {
    const f = PVector.div(force, this.mass)
    this.acceleration.add(f)
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
    q.fill(127, 100)
    q.ellipse(this.location.x, this.location.y, this.mass * 20, this.mass * 20)
  }
}

const movers = []
for (let i = 0; i < 5; i++) {
  movers[i] = new Mover()
}

// const wind = new PVector(0.2, 0)

q.draw = () => {
  q.background(255)

  for (let m of movers) {
    const gravity = new PVector(0, 0.3)
    gravity.mult(m.mass)
    m.applyForce(gravity)
    // m.applyForce(wind)

    if (q.mousePressed) {
      const friction = m.velocity.copy()
      friction.normalize()
      const c = -0.1
      friction.mult(c)
      m.applyForce(friction)
    }

    m.update()
    m.edges()
    m.display()
  }
}
