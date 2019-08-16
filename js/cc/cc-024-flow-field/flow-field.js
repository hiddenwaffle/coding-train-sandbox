import { Sketch, Vector } from '../../handcar'
import { Particle } from './particle'
export const s = new Sketch()
s.size(200, 200)

// https://www.youtube.com/watch?v=BjoM9oKOAKY

const inc = 0.03
export const scl = 10
export const cols = Math.floor(s.width / scl)
const rows = Math.floor(s.height / scl)
let zoff = 0
const particles = []
for (let i = 0; i < 500; i++) {
  particles.push(new Particle())
}
const flowfield = new Array(rows * cols)

s.background(255)

s.draw = () => {
  for (let y = 0, yoff = 0; y < rows; y++, yoff += inc) {
    for (let x = 0, xoff = 0; x < cols; x++, yoff += inc) {
      const angle = s.noise(xoff, yoff, zoff) * s.TWO_PI * 4
      const v = Vector.fromAngle(angle)
      v.setMag(1)
      const index = x + y * cols
      flowfield[index] = v
      // s.stroke(0, 100)
      // s.pushMatrix()
      // s.translate(x * scl, y * scl)
      // s.rotate(v.heading2D())
      // s.line(0, 0, scl, 0)
      // s.popMatrix()
    }
  }
  zoff += inc
  for (let particle of particles) {
    particle.follow(flowfield)
    particle.update()
    particle.edges()
    particle.show()
  }
}
