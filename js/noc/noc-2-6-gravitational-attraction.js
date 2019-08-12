import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=fML1KpvvQTc

q.size(640, 360)

class Mover {
  constructor() {
    this.location = new PVector(400, 50)
    this.velocity = new PVector(1, 0)
    this.acceleration = new PVector()
    this.mass = 1
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

  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(225, 100)
    q.ellipse(this.location.x, this.location.y, this.mass * 20, this.mass * 20)
  }
}

class Attractor {
  constructor() {
    this.mass = 20
    this.G = 1
    this.location = new PVector(q.width / 2, q.height / 2)
    this.dragging = false
    this.rollover = false
    this.dragOffset = new PVector()
  }

  attract(m) {
    const force = PVector.sub(this.location, m.location)
    let d = force.mag()
    d = q.constrain(d, 5, 25)
    force.normalize()
    const strength = (this.G * this.mass) / (d * d)
    force.mult(strength)
    return force
  }

  display() {
    q.ellipseMode(q.CENTER)
    q.strokeWeight(4)
    q.stroke(0)
    if (this.dragging) q.fill(50)
    else if (this.rollover) q.fill(100)
    else q.fill(175, 200)
    q.ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2)
  }

  clicked(mx, my) {
    const d = q.dist(mx, my, this.location.x, this.location.y)
    if (d < this.mass) {
      this.dragging = true
      this.dragOffset.x = this.location.x - mx
      this.dragOffset.y = this.location.y - my
    }
  }

  hover(mx, my) {
    const d = q.dist(mx, my, this.location.x, this.location.y)
    this.rollover = d < this.mass
  }

  stopDragging() {
    this.dragging = false
  }

  drag() {
    if (this.dragging) {
      this.location.x = q.mouseX + this.dragOffset.x
      this.location.y = q.mouseY + this.dragOffset.y
    }
  }
}

const m = new Mover()
const a = new Attractor()

q.draw = () => {
  q.background(255)

  const force = a.attract(m)
  m.applyForce(force)
  m.update()

  a.drag()
  a.hover(q.mouseX, q.mouseY)

  a.display()
  m.display()
}

q.mousePressed = () => {
  a.clicked(q.mouseX, q.mouseY)
}

q.mouseReleased = () => {
  a.stopDragging()
}
