import { Sketch } from '/handcar'
const q = new Sketch()

class Walker {
  constructor() {
    this.x = q.width / 2
    this.y = q.height / 2
  }

  step() {
    let choice = Math.floor(q.random(4))
    if (choice === 0) {
      this.x++
    } else if (choice === 1) {
      this.x--
    } else if (choice === 2) {
      this.y++
    } else {
      this.y--
    }
  }

  render() {
    q.stroke(0)
    q.point(this.x, this.y)
  }
}

q.size(800, 600)
const w = new Walker()
q.background(255)

q.draw = () => {
  w.step()
  w.render()
}
