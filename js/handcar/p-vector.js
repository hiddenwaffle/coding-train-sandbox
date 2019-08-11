class PVector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  add(other) {
    this.x += other.x
    this.y += other.y
  }

  sub(other) {
    this.x -= other.x
    this.y -= other.y
  }

  mult(s) {
    this.x *= s
    this.y *= s
  }

  mag() {
    return Math.sqrt(this.x * this.x +
                     this.y * this.y)
  }
}

export default PVector = PVector
