import s from './star-field-sketch'

export class Star {
  constructor() {
    this.x = s.random(-s.width / 2, s.width / 2)
    this.y = s.random(-s.height / 2, s.height / 2)
    this.z = s.random(s.width)
    this.pz = this.z
  }

  update() {
    const speed = s.map(s.mouseX, 0, s.width, 0, 20)
    this.pz = this.z
    this.z -= speed
    if (this.z < 1) {
      this.x = s.random(-s.width / 2, s.width / 2)
      this.y = s.random(-s.height / 2, s.height / 2)
      this.z = s.width
      this.pz = this.z
    }
  }

  show() {
    s.fill(255)
    s.stroke(255)
    const px = s.map(this.x / this.pz, 0, 1, 0, s.width)
    const sx = s.map(this.x / this.z,  0, 1, 0, s.width)
    const py = s.map(this.y / this.pz, 0, 1, 0, s.width)
    const sy = s.map(this.y / this.z,  0, 1, 0, s.width)
    let r = s.map(this.z, 0, s.width, 4, 0)
    if (r < 0.5) r = 0.5 // Prevent Canvas API issue
    s.line(px, py, sx, sy)
    s.ellipse(sx, sy, r, r)
  }
}
