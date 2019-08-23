import { s, resolution } from './fractal-spirograph'

const k = -4

export class Orbit {
  constructor(x, y, r, n, parent=null) {
    this.x = x
    this.y = y
    this.r = r
    this.parent = parent
    this.child = null
    this.angle = -s.PI / 2
    this.n = n
    this.speed = s.radians(s.pow(k, n - 1)) / resolution
  }

  addGeneration() {
    if (this.child) {
      this.child.addGeneration()
    } else {
      const newr = this.r / s.E
      const newx = this.x + this.r + newr
      const newy = this.y
      this.child = new Orbit(newx, newy, newr, this.n + 1, this)
    }
  }

  youngest() {
    if (this.child) {
      return this.child.youngest()
    } else {
      return this
    }
  }

  update() {
    this.angle += this.speed
    if (this.parent) {
      const rsum = this.r + this.parent.r
      this.x = this.parent.x + rsum * s.cos(this.angle)
      this.y = this.parent.y + rsum * s.sin(this.angle)
    }
    if (this.child) {
      this.child.update()
    }
  }

  show() {
    s.stroke(255, 100)
    s.strokeWeight(1)
    s.noFill()
    s.ellipse(this.x, this.y, this.r * 2, this.r * 2)
    if (this.child) {
      this.child.show()
    }
  }
}
