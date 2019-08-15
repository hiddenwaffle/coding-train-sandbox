import { Sketch, Vector } from '../handcar'
const q = new Sketch()
q.size(640, 360)

// https://www.youtube.com/watch?v=IoKfQrlQ7rA

class Vehicle {
  constructor(x, y) {
    this.position = new Vector(x, y)
    this.r = 12
    this.maxspeed = 3
    this.maxforce = 0.2
    this.acceleration = new Vector()
    this.velocity = new Vector()
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  applyBehaviors(vehicles) {
    const separateForce = this.separate(vehicles)
    const seekForce = this.seek(new Vector(q.mouseX, q.mouseY))
    separateForce.mult(2)
    seekForce.mult(1)
    this.applyForce(separateForce)
    this.applyForce(seekForce)
  }

  seek(target) {
    const desired = Vector.sub(target, this.position)
    desired.normalize()
    desired.mult(this.maxspeed)
    const steer = Vector.sub(desired, this.velocity)
    steer.limit(this.maxforce)
    return steer
  }

  separate(vehicles) {
    const desiredseparate = this.r * 2
    const sum = new Vector()
    let count = 0
    for (let other of vehicles) {
      const d = Vector.dist(this.position, other.position)
      if ((d > 0) && (d < desiredseparate)) {
        const diff = Vector.sub(this.position, other.position)
        diff.normalize()
        diff.div(d)
        sum.add(diff)
        count++
      }
    }
    if (count > 0) {
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxspeed)
      sum.sub(this.velocity)
      sum.limit(this.maxforce)
    }
    return sum
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  display() {
    q.fill(175)
    q.stroke(0)
    q.pushMatrix()
    q.translate(this.position.x, this.position.y)
    q.ellipse(0, 0, this.r, this.r)
    q.popMatrix()
  }
}

const vehicles = []
for (let i = 0; i < 100; i++) {
  vehicles.push(new Vehicle(q.random(q.width), q.random(q.height)))
}

q.draw = () => {
  q.background(255)
  for (let v of vehicles) {
    v.applyBehaviors(vehicles)
    v.update()
    v.display()
  }
}

q.mousePressed = () => {
  vehicles.push(new Vehicles(q.mouseX, q.mouseY))
}
