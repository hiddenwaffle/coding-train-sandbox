import { Sketch } from '../../handcar'
import { Boundary } from './boundary'
import { Ray } from './ray'
import { Particle } from './particle'
export const view = new Sketch()
view.size(400, 400)
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

let scene = []

s.draw = () => {
  s.background(51)
  for (let wall of walls) {
    wall.show()
  }
  particle.show()
  scene = particle.look(walls)
}

const furthestPossible = view.dist(0, 0, view.width, view.height)

view.rectMode(view.CENTER)
view.draw = () => {
  view.background(32)
  const w = view.width / scene.length
  for (let i = 0; i < scene.length; i++) {
    view.noStroke()
    const b = view.map(scene[i], 0, furthestPossible, 255, 0)
    view.fill(b)
    const h = view.map(scene[i], 0, view.width, view.height, 0)
    view.rect(i * w + w / 2,
              view.height / 2,
              w,
              h)
  }
}

view.keyPressed = (keys) => {
  if (keys.get('a')) {
    particle.rotate(-5)
  }
  if (keys.get('d')) {
    particle.rotate(5)
  }
  if (keys.get('w')) {
    particle.forward(5)
  }
  if (keys.get('s')) {
    particle.forward(-5)
  }
}
