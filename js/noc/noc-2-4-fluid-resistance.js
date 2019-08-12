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
    q.fill(225, 100)
    q.ellipse(this.location.x, this.location.y, this.mass * 20, this.mass * 20)
  }
}

class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = c
  }

  contains(m) {
    return m.location.x > this.x &&
           m.location.x < this.x + this.w &&
           m.location.y > this.y &&
           m.location.y < this.y + this.h
  }

  drag(m) {
    const speedSq = m.velocity.magSq()
    const dragMagnitude = this.c * speedSq
    const dragForce = m.velocity.copy()
    dragForce.mult(-1)
    dragForce.normalize()
    dragForce.mult(dragMagnitude)
    return dragForce
  }

  display() {
    q.fill(128)
    q.rect(this.x, this.y, this.w, this.h)
  }
}

const movers = []
for (let i = 0; i < 5; i++) {
  movers[i] = new Mover()
}

const liquid = new Liquid(0, q.height / 2, q.width, q.height / 2, 0.1)

q.draw = () => {
  q.background(255)
  liquid.display()
  for (let m of movers) {
    if (liquid.contains(m)) {
      const dragForce = liquid.drag(m)
      m.applyForce(dragForce)
    }
    const gravity = new PVector(0, 0.1 * m.mass)
    m.applyForce(gravity)
    m.update()
    m.edges()
    m.display()
  }
}
