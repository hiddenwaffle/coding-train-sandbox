import { Sketch, PVector } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=7nTLzLf7jUg

q.size(400, 300)

class Ball {
  constructor() {
    this.location = new PVector(q.width / 2, q.height / 2)
    this.velocity = new PVector(2.5, -2)
  }

  move() {
    this.location.add(this.velocity)
  }

  bounce() {
    if ((this.location.x > q.width) || (this.location.x < 0)) {
      this.velocity.x *= -1
    }
    if ((this.location.y > q.height) || (this.location.y < 0)) {
      this.velocity.y *= -1
    }
  }

  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(127)
    q.ellipse(this.location.x, this.location.y, 48, 48)
  }
}

const ball = new Ball()

q.draw = () => {
  q.background(255)
  ball.move()
  ball.bounce()
  ball.display()
}
