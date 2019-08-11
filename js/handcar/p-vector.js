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

  div(s) {
    this.x /= s
    this.y /= s
  }

  mag() {
    return Math.sqrt(this.x * this.x +
                     this.y * this.y)
  }

  normalize() {
    // 0.001 to prevent division by zero if mag is zero
    this.div(this.mag() || 0.001)
  }
}

export default PVector = PVector
