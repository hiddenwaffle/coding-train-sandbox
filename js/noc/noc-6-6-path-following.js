import { Sketch, PVector } from '../handcar'
const q = new Sketch()
q.size(640, 360)

// https://www.youtube.com/watch?v=2qGsBClh3hE

class Vehicle {
  constructor(l, ms, mf) {
    this.position = l.copy()
    this.r = 4
    this.maxspeed = ms
    this.maxforce = mf
    this.acceleration = new PVector()
    this.velocity = new PVector(this.maxspeed, 0)
  }

  run() {
    this.update()
    this.display()
  }

  follow(p) {
    const predict = this.velocity.copy()
    predict.normalize()
    predict.mult(50)
    const predictpos = PVector.add(this.position, predict)
    let normal = null
    let target = null
    let worldRecord = 1000000
    for (let i = 0; i < p.points.length - 1; i++) {
      const a = p.points[i]
      const b = p.points[i + 1]
      let normalPoint = this.getNormalPoint(predictpos, a, b)
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy()
      }
      const distance = PVector.dist(predictpos, normalPoint)
      if (distance < worldRecord) {
        worldRecord = distance
        normal = normalPoint
        const dir = PVector.sub(b, a)
        dir.normalize()
        dir.mult(10)
        target = normalPoint.copy()
        target.add(dir)
      }
    }
    if (worldRecord > p.radius) {
      this.seek(target)
    }
    if (debug) {
      q.stroke(0)
      q.fill(0)
      q.line(this.position.x, this.position.y, predictpos.x, predictpos.y)
      q.ellipse(predictpos.x, predictpos.y, 4, 4)
      q.stroke(0)
      q.fill(0)
      q.ellipse(normal.x, normal.y, 4, 4)
      q.line(predictpos.x, predictpos.y, normal.x, normal.y)
      if (worldRecord > p.radius) q.fill(255, 0, 0)
      q.noStroke()
      q.ellipse(target.x, target.y, 8, 8)
    }
  }

  getNormalPoint(p, a, b) {
    const ap = PVector.sub(p, a)
    const ab = PVector.sub(b, a)
    ab.normalize()
    ab.mult(ap.dot(ab))
    const normalPoint = PVector.add(a, ab)
    return normalPoint
  }

  update() {
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxspeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  seek(target) {
    const desired = PVector.sub(target, this.position)
    if (desired.mag() === 0) return
    desired.normalize()
    desired.mult(this.maxspeed)
    const steer = PVector.sub(desired, this.velocity)
    steer.limit(this.maxforce)
    this.applyForce(steer)
  }

  display() {
    const theta = this.velocity.heading2D() + q.radians(90)
    q.fill(175)
    q.stroke(0)
    q.pushMatrix()
    q.translate(this.position.x, this.position.y)
    q.rotate(theta)
    q.beginShape(q.TRIANGLES)
    q.vertex(0, -this.r * 2)
    q.vertex(-this.r, this.r * 2)
    q.vertex(this.r, this.r * 2)
    q.endShape()
    q.popMatrix()
  }

  borders(p) {
    if (this.position.x > p.getEnd().x + this.r) {
      this.position.x = p.getStart().x - this.r
      this.position.y = p.getStart().y + (this.position.y - p.getEnd().y)
    }
  }
}

class Path {
  constructor() {
    this.radius = 20
    this.points = []
  }

  addPoint(x, y) {
    this.points.push(new PVector(x, y))
  }

  getStart() {
    return this.points[0]
  }

  getEnd() {
    return this.points[this.points.length - 1]
  }

  display() {
    q.stroke(175)
    q.strokeWeight(this.radius * 2)
    q.noFill()
    q.beginShape()
    for (let v of this.points) {
      q.vertex(v.x, v.y)
    }
    q.endShape()
    q.stroke(0)
    q.strokeWeight(1)
    q.noFill()
    q.beginShape()
    for (let v of this.points) {
      q.vertex(v.x, v.y)
    }
    q.endShape()
  }
}

let debug = true
let path = newPath()
let car1 = new Vehicle(new PVector(0, q.height / 2), 2, 0.04)
let car2 = new Vehicle(new PVector(0, q.height / 2), 3, 0.1)

q.draw = () => {
  q.background(255)
  path.display()
  car1.follow(path)
  car2.follow(path)
  car1.run()
  car2.run()
  car1.borders(path)
  car2.borders(path)
  q.fill(0)
}

function newPath() {
  const path = new Path()
  path.addPoint(-20, q.height / 2)
  path.addPoint(q.random(0, q.width / 2), q.random(0, q.height))
  path.addPoint(q.random(q.width / 2, q.width), q.random(0, q.height))
  path.addPoint(q.width + 20, q.height / 2)
  return path
}

q.keyTyped = () => {
  if (q.key === ' ') {
    debug = !debug
  }
}

q.mousePressed = () => {
  path = newPath()
}
