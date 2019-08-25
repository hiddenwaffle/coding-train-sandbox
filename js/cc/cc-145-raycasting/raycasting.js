import { Sketch } from '../../handcar'
import { Boundary } from './boundary'
import { Ray } from './ray'
import { Particle } from './particle'
export const s = new Sketch()
s.size(400, 400)

const walls = []
for (let i = 0; i < 5; i++) {
  const x1 = s.random(s.width)
  const y1 = s.random(s.height)
  const x2 = s.random(s.width)
  const y2 = s.random(s.height)
  walls.push(new Boundary(x1, y1, x2, y2))
}
walls.push(new Boundary(0, 0, s.width - 1, 0))
walls.push(new Boundary(s.width - 1, 0, s.width - 1, s.height - 1))
walls.push(new Boundary(0, s.height - 1, s.width - 1, s.height - 1))
walls.push(new Boundary(0, 0, 0, s.height - 1))
const particle = new Particle()

s.draw = () => {
  s.background(51)
  for (let wall of walls) {
    wall.show()
  }
  particle.update(s.mouseX, s.mouseY)
  particle.show()
  particle.look(walls)
}
