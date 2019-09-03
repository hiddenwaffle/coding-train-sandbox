import { Sketch } from '../../handcar'
import { Particle } from './particle'
export const s = new Sketch()
s.size(600, 600)

// https://www.youtube.com/watch?v=XUA8UREROYE

let current = new Particle(s.width / 2, s.random(10))
const snowflake = []

s.draw = () => {
  s.background(0)
  s.translate(s.width / 2, s.height / 2)
  s.rotate(s.PI / 6)
  while (!current.finished() && !current.intersects(snowflake)) {
    current.update()
  }
  if (current.pos.x > s.width / 2 - 1) { // Means snowflake is fully grown
    s.noLoop()
  }
  snowflake.push(current)
  current = new Particle(s.width / 2, 0)
  for (let i = 0; i < 6; i++) {
    current.show()
    for (let p of snowflake) {
      p.show()
    }
    s.rotate(s.PI / 3)
    s.pushMatrix()
    s.scale(1, -1)
    current.show()
    for (let p of snowflake) {
      p.show()
    }
    s.popMatrix()
  }
}
