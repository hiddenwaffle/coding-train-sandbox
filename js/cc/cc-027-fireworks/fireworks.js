import { Sketch, Vector } from '../../handcar'
import { Firework } from './firework'
export const s = new Sketch()
s.size(800, 400)

// https://www.youtube.com/watch?v=CKeyIbT3vXI
// Origin of the this dot song

const fireworks = []

s.noStroke()

s.draw = () => {
  s.background(20, 64)
  if (s.random(1) < 0.05) {
    fireworks.push(new Firework(Math.floor(s.random(s.width)), s.height))
  }
  for (let i = fireworks.length - 1; i >= 0; i--) {
    const firework = fireworks[i]
    firework.update()
    firework.show()
    if (firework.completed) {
      fireworks.splice(i, 1)
    }
  }
}
