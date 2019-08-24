import { Sketch } from '../../handcar'
import { Segment } from './segment2'
export const s = new Sketch()
s.size(600, 400)

const tentacle = new Segment(300, 200, 10, 1)
for (let i = 2; i <= 20; i++) {
  tentacle.chain(10, i)
}

s.draw = () => {
  s.background(51)
  tentacle.follow(s.mouseX, s.mouseY)
  tentacle.update()
  tentacle.show()
}
