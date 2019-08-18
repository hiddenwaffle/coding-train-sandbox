import { Sketch } from '../../handcar'
import { Circle } from './circle'
export const s = new Sketch()
s.size(640, 360)

const circles = []

s.draw = () => {
  s.background(51)
  for (let c of circles) {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false
      } else {
        for (let other of circles) {
          if (other !== c) {
            const d = s.dist(c.x, c.y, other.x, other.y)
            if (d - 2 < c.r + other.r) {
              c.growing = false
              break
            }
          }
        }
      }
    }
    c.show()
    c.grow()
  }
  const newC = newCircle()
  if (newC) {
    circles.push(newC)
  }
}

function newCircle() {
  const x = s.random(s.width)
  const y = s.random(s.height)
  let valid = true
  for (let c of circles) {
    const d = s.dist(x, y, c.x, c.y)
    if (d < c.r) {
      valid = false
      break
    }
  }
  if (valid) {
    return new Circle(x, y)
  } else {
    return null
  }
}
