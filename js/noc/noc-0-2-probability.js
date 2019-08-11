import { Sketch } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=frh0coyRmJQ

class Walker {
  constructor() {
    this.x = q.width / 2
    this.y = q.height / 2
  }

  step() {
    const r = q.random(1)
    if (r < 0.4) {
      this.x++
    } else if (r < 0.6) {
      this.x--
    } else if (r < 0.8) {
      this.y++
    } else {
      this.y--
    }

    this.x = q.constrain(this.x, 0, q.width - 1)
    this.y = q.constrain(this.y, 0, q.height - 1)
  }

  render() {
    q.stroke(0)
    q.point(this.x, this.y)
  }
}

q.size(100, 100)
q.background(255)
const w = new Walker()

q.draw = () => {
  w.step()
  w.render()
}
