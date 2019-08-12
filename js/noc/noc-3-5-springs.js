import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=cluKQOY92Dw

q.size(640, 360)

class Mover {
  constructor(x, y) {
    this.location = new PVector(x, y)
    this.velocity = new PVector()
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
    q.fill(127)
    q.ellipse(this.location.x, this.location.y, 32, 32)
  }
}

const restLength = 200
const origin = new PVector(q.width / 2, 0)
const bob = new Mover(q.width / 2, 240)
const gravity = new PVector(0, 0.1)

q.draw = () => {
  q.background(255)
  q.line(origin.x, origin.y, bob.location.x, bob.location.y)

  const spring = PVector.sub(bob.location, origin)
  const currentLength = spring.mag()
  spring.normalize()
  const k = 0.1
  const stretch = currentLength - restLength
  spring.mult(-k * stretch)
  bob.applyForce(spring)

  const wind = new PVector(0.1, 0)
  if (q.mousePressed) {
    bob.applyForce(wind)
  }
  bob.applyForce(gravity)

  bob.update()
  bob.display()
}
