import { s, r } from './diffusion-limited-aggregation'
import { Vector } from '../../handcar'

let colorIndex = 55
const rgb = [0, 0, 0]

export class Walker {
  constructor(x, y) {
    if (x !== undefined && y !== undefined) {
      this.pos = new Vector(x, y)
      this.stuck = true
    } else {
      this.pos = randomPoint()
      this.stuck = false
    }
    this.hue = colorIndex // this assignment only affects the initial walker
  }

  walk() {
    const vel = Vector.random2D()
    this.pos.add(vel)
    this.pos.x = s.constrain(this.pos.x, 0, s.width)
    this.pos.y = s.constrain(this.pos.y, 0, s.height)
  }

  checkStuck(others) {
    this.stuck = false
    for (let other of others) {
      const d = distSq(this.pos, other.pos)
      if (d < r * 10) {
        colorIndex += 0.1
        this.hue = colorIndex % 100
        this.stuck = true
      }
    }
    return this.stuck
  }

  show() {
    s.stroke(255, 100)
    if (this.stuck) {
      s.HSVtoRGB(this.hue, 99, 99, rgb)
      s.fill(rgb[0], rgb[1], rgb[2], 128)
    } else {
      s.fill(255, 100)
    }
    s.ellipse(this.pos.x, this.pos.y, r * 2, r * 2)
  }
}

function randomPoint() {
  const i = s.random([0, 1, 2, 3])
  const x = s.random(s.width)
  const y = s.random(s.height)
  switch (i) {
    case 0:
      return new Vector(x, 0)
    case 1:
      return new Vector(x, s.height)
    case 2:
      return new Vector(0, y)
    case 3:
      return new Vector(s.width, y)
  }
}

function distSq(a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return dx * dx + dy * dy
}
