import { Sketch, Vector } from '../../handcar'
import { Particle } from './particle'
export const s = new Sketch()
s.size(800, 480)

s.createP('Left-click to add attractor')
s.createP('Any other mouse button adds a repulsor')

const particles = []
for (let i = 0; i < 250; i++) {
  particles.push(new Particle(s.random(s.width),
                              s.random(s.height)))
}
const attractors = []

s.draw = () => {
  s.background(51, 100)
  s.strokeWeight(4)
  for (let attractor of attractors) {
    if (attractor.repels) {
      s.stroke(255, 128, 64)
    } else {
      s.stroke(64, 255, 128)
    }
    s.point(attractor.x, attractor.y)
  }
  for (let particle of particles) {
    for (let attractor of attractors) {
      particle.attracted(attractor)
    }
    particle.update()
    particle.show()
  }
}

s.mousePressed = (button) => {
  const attractor = new Vector(s.mouseX, s.mouseY)
  attractor.repels = button !== s.MOUSE_BUTTON_MAIN
  attractors.push(attractor)
}
