import { Sketch } from '../../handcar'
import { Toothpick } from './toothpick'
export const s = new Sketch()
s.size(600, 600)

export const len = 63

let picks = []
picks.push(new Toothpick(0, 0, 1))
s.noLoop()

s.mousePressed = () => {
  s.redraw()
}

s.draw = () => {
  s.noLoop()
  s.background(255)
  const next = []
  s.translate(s.width / 2, s.height / 2)
  for (let t of picks) {
    t.show()
    const nextA = t.createA(picks)
    const nextB = t.createB(picks)
    if (nextA) next.push(nextA)
    if (nextB) next.push(nextB)
  }
  picks = picks.concat(next)
}
