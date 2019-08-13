import { Sketch, PVector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=XXEK3UEDDIg

q.size(640, 360)

class Vehicle {
  constructor(l, ms, mf) {
    this.location = l.copy()
    this.r = 6
    this.maxspeed = ms
    this.maxforce = mf
    this.acceleration = new PVector()
    this.velocity = new PVector()
  }

  run() {
    this.update()
    this.borders()
    this.display()
  }

  follow(flow) {
    const desired = flow.lookup(this.location)
    desired.mult(this.maxspeed)
    const steer = PVector.sub(desired, this.velocity)
    steer.limit(this.maxforce)
    this.applyForce(steer)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  display() {
    const theta = this.velocity.heading2D() + q.radians(90)
    q.fill(175)
    q.stroke(0)
    q.strokeWeight(1)
    q.pushMatrix()
    q.translate(this.location.x, this.location.y)
    q.rotate(theta)
    q.beginShape(q.TRIANGLES)
    q.vertex(0, -this.r * 2)
    q.vertex(-this.r, this.r * 2)
    q.vertex(this.r, this.r * 2)
    q.endShape()
    q.popMatrix()
  }

  borders() {
    if (this.location.x < -this.r) this.location.x = q.width + this.r
    if (this.location.y < -this.r) this.location.y = q.height + this.r
    if (this.location.x > q.width + this.r) this.location.x = -this.r
    if (this.location.y > q.height + this.r) this.location.y = -this.r
  }
}

class FlowField {
  constructor(r) {
    this.resolution = r
    this.cols = q.width / this.resolution
    this.rows = q.height / this.resolution
    this.field = []
    this.init()
  }

  init() {
    let xoff = 0
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0
      this.field.push([])
      for (let j = 0; j < this.rows; j++) {
        const theta = q.map(q.noise(xoff, yoff), 0, 1, 0, q.TWO_PI)
        this.field[i][j] = PVector.fromAngle(theta)
        yoff += 0.1
      }
      xoff += 0.1
    }
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j],
                        i * this.resolution,
                        j * this.resolution,
                        this.resolution - 2)
      }
    }
  }

  drawVector(v, x, y, scale) {
    q.pushMatrix()
    q.translate(x, y)
    q.stroke(0, 100)
    q.rotate(v.heading2D())
    const len = v.mag() * scale
    q.line(0, 0, len, 0)
    q.popMatrix()
  }

  lookup(location) {
    const column = Math.floor(q.constrain(location.x / this.resolution, 0, this.cols - 1))
    const row = Math.floor(q.constrain(location.y / this.resolution, 0, this.rows - 1))
    return this.field[column][row].copy()
  }
}

const debug = true
const flowfield = new FlowField(20)
const vehicles = []
for (let i = 0; i < 120; i++) {
  vehicles.push(new Vehicle(new PVector(q.random(q.width),
                                        q.random(q.height)),
                            q.random(2, 5),
                            q.random(0.1, 0.5)))
}

q.draw = () => {
  q.background(255)
  if (debug) flowfield.display()
  for (let v of vehicles) {
    v.follow(flowfield)
    v.run()
  }
  q.fill(0)
  // TODO: Text
}
