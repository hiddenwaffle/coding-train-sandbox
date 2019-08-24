import { Sketch, Vector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=4zhJlkGQTvU

q.size(640, 360)

class Vehicle {
  constructor(x, y) {
    this.acceleration = new Vector()
    this.velocity = new Vector(0, -2)
    this.location = new Vector(x, y)
    this.r = 6
    this.maxspeed = 4
    this.maxforce = 0.1
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  seek(target) {
    const desired = Vector.sub(target, this.location)
    desired.normalize()
    desired.mult(this.maxspeed)
    const steer = Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce)
    this.applyForce(steer)
  }

  display() {
    const theta = this.velocity.heading() + Math.PI / 2
    q.fill(127)
    q.stroke(0)
    q.strokeWeight(1)
    q.pushMatrix()
    q.translate(this.location.x, this.location.y)
    q.rotate(theta)
    q.beginShape()
    q.vertex(0, -this.r * 2)
    q.vertex(-this.r, this.r * 2)
    q.vertex(this.r, this.r * 2)
    q.endShape(q.CLOSE)
    q.popMatrix()
  }
}

const v = new Vehicle(q.width / 2, q.height /2)

q.draw = () => {
  q.background(255)
  const mouse = new Vector(q.mouseX, q.mouseY)
  q.fill(200)
  q.stroke(0)
  q.strokeWeight(2)
  q.ellipse(mouse.x, mouse.y, 48, 48)
  v.seek(mouse)
  v.update()
  v.display()
}
