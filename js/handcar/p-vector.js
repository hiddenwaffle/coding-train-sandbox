class PVector {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  add(other) {
    this.x += other.x
    this.y += other.y
  }
}

export default PVector = PVector
