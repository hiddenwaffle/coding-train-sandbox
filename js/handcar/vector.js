function present(x) {
  return x !== undefined && x !== null
}

class Vector {
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
    return new Vector(this.x, this.y)
  }

  /**
   * a is either a vector or the x component
   * b is the y component if the a is an x component
   */
  set(a, b) {
    if (present(a) && present(b)) {
      this.x = a
      this.y = b
    } else {
      this.x = a.x
      this.y = a.y
    }
  }

  heading() {
    return Math.atan2(this.y, this.x)
  }

  /**
   * 2D cross product is a scalar.
   * I think if this were 3D with zero as the z component,
   * the scalar returned would represent the z of the
   * resulting vector.
   *
   * This was added solely for coding challenge #148 (gift wrapping).
   */
  cross2D(other) {
    return this.x * other.y - other.x * this.y
  }

  dot(other) {
    return this.x * other.x + this.y * other.y
  }

  rotate(a) {
    const xTemp = this.x
    this.x = this.x * Math.cos(a) - this.y * Math.sin(a)
    this.y = xTemp * Math.sin(a) + this.y * Math.cos(a)
  }

  /**
   * current is a value between 0.0 and 1.0
   */
  lerp(end, current) {
    // Matches lerp() in Sketch:
    this.x = this.x + (end.x - this.x) * current
    this.y = this.y + (end.y - this.y) * current
  }
}

Vector.add = function (v1, v2) {
  const copy = v1.copy()
  copy.add(v2)
  return copy
}

Vector.sub = function (v1, v2) {
  const copy = v1.copy()
  copy.sub(v2)
  return copy
}

Vector.mult = function (v, s) {
  const copy = v.copy()
  copy.mult(s)
  return copy
}

Vector.div = function (v, s) {
  const copy = v.copy()
  copy.div(s)
  return copy
}

Vector.fromAngle = function (a) {
  return new Vector(Math.cos(a), Math.sin(a))
}

Vector.random2D = function () {
  return Vector.fromAngle(Math.random() * 2 * Math.PI)
}

Vector.dist = function (a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) +
                   Math.pow(b.y - a.y, 2))
}

export default Vector = Vector
