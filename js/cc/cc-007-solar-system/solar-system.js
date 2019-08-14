import s from './solar-system-sketch'
import { Planet } from './planet'

const sun = new Planet(50, 0, 0)
sun.spawnMoons(5)

s.draw = () => {
  s.background(32)
  s.translate(s.width / 2, s.height / 2)
  sun.orbit()
  sun.show()
}
