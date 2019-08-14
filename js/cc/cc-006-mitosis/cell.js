import s from './mitosis-sketch'
import { PVector } from '../../handcar'

export class Cell {
  constructor(pos, initialPush, d) {
    this.pos = pos || new PVector(s.random(s.width), s.random(s.height))
    this.vel = new PVector()
    this.acc = new PVector()
    this.initialPush = initialPush || new PVector()
    this.d = d || 200
    this.c = s.color(s.random(0, 128),
                     s.random(128, 255),
                     s.random(128, 255))
    this.xvalue = s.random(10000)
    this.yvalue = s.random(10000)
  }

  clicked(x, y) {
    const d = s.dist(this.pos.x, this.pos.y, x, y)
    return d < this.d / 2
  }

  mitosis() {
    const pusha = new PVector.random2D()
    pusha.mult(this.d * 0.025)
    const pushb = PVector.mult(pusha, -1)
    return [new Cell(this.pos.copy(), pusha, this.d / 1.4),
            new Cell(this.pos.copy(), pushb, this.d / 1.4)]
  }

  move() {
    // First, walk
    const walk = this.calculateRandomWalk()
    this.acc.add(walk)
    this.vel.add(this.acc)
    this.vel.limit(0.25)
    this.pos.add(this.vel)
    this.acc.mult(0)
    // Second, intial push, if any
    if (this.initialPush) {
      this.vel.add(this.initialPush)
      this.pos.add(this.vel)
      this.initialPush.mult(0.9)
      if (this.initialPush < 0.1) {
        this.initialPush = null
      }
    }
  }

  calculateRandomWalk() {
    this.xvalue += 0.01
    this.yvalue += 0.01
    const maxforce = 1
    const x = s.noise(this.xvalue) * maxforce - (maxforce / 2)
    const y = s.noise(this.yvalue) * maxforce - (maxforce / 2)
    return new PVector(x, y)
  }

  edges() {
    if (this.pos.x < 0) this.pos.x = s.width
    if (this.pos.x > s.width) this.pos.x = 0
    if (this.pos.y < 0) this.pos.y = s.height
    if (this.pos.y > s.height) this.pos.y = 0
  }

  show() {
    s.stroke(255)
    s.strokeWeight(2)
    s.fill(this.c)
    s.ellipse(this.pos.x, this.pos.y, this.d, this.d)
  }
}
