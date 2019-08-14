import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(640, 360)

// https://www.youtube.com/watch?v=KkyIDI6rQJI

class Drop {
  constructor() {
    this.x = s.random(s.width)
    this.y = s.random(-500, -100)
    this.z = s.random(0, 20)
    this.len = s.map(this.z, 0, 20, 10, 20)
    this.yspeed = s.map(this.z, 0, 20, 1, 20)
  }

  fall() {
    this.y += this.yspeed
    const grav = s.map(this.z, 0, 20, 0, 0.2)
    this.yspeed += grav
    if (this.y > s.height) {
      this.y = s.random(-200, -100)
      this.yspeed = s.map(this.z, 0, 20, 4, 10)
    }
  }

  show() {
    const thick = s.map(this.z, 0, 20, 1, 3)
    s.strokeWeight(thick)
    s.stroke(138, 43, 226)
    s.line(this.x, this.y, this.x, this.y + this.len)
  }
}

const drops = []
for (let i = 0; i < 500; i++) {
  drops.push(new Drop())
}

s.draw = () => {
  s.background(230, 230, 250)
  for (let d of drops) {
    d.fall()
    d.show()
  }
}
