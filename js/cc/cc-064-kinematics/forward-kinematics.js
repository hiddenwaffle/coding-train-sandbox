import { Sketch, Vector } from '../../handcar'
import { Segment } from './segment'
export const s = new Sketch()
s.size(600, 400)

const tentacles = []
for (let x = 0; x < s.width; x += 10) {
  tentacles.push(new Segment(x, s.height, 10, 0))
}
for (let tentacle of tentacles) {
  for (let _ = 0; _ < 40; _++) {
    tentacle.chain(10, 0)
  }
}

s.draw = () => {
  s.background(51)
  for (let tentacle of tentacles) {
    tentacle.wiggle()
    tentacle.update()
    tentacle.show()
  }
}
