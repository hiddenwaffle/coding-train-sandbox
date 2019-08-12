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
    return Math.sqrt(this.magSq())
  }

  magSq() {
    return this.x * this.x +
           this.y * this.y
  }

  setMag(s) {
    this.normalize()
    this.mult(s)
  }

  normalize() {
    // 0.001 to prevent division by zero if mag is zero
    this.div(this.mag() || 0.001)
  }

  limit(s) {
    if (this.mag() > s) {
      this.setMag(s)
    }
  }

  copy() {
    return new PVector(this.x, this.y)
  }
}

PVector.sub = function (v1, v2) {
  const copy = v1.copy()
  copy.sub(v2)
  return copy
}

PVector.div = function (v, s) {
  const copy = v.copy()
  copy.div(s)
  return copy
}

PVector.fromAngle = function (a) {
  return new PVector(Math.cos(a), Math.sin(a))
}

PVector.random2D = function () {
  return PVector.fromAngle(Math.random() * Math.PI)
}

export default PVector = PVector
