import { Sketch } from '../../handcar'
import { Toothpick } from './toothpick'
export const s = new Sketch()
s.size(600, 600)

export const len = 63
let minX = -s.width / 2
let maxX =  s.width / 2

let picks = []
picks.push(new Toothpick(0, 0, 1))
s.noLoop()

let lastTime = 0
s.draw = (time) => {
  if (time - lastTime < 500) return
  lastTime = time
  console.log(picks.length)
  s.background(255)
  s.translate(s.width / 2, s.height / 2)
  const factor = s.width / (maxX - minX)
  s.scale(factor)
  for (let t of picks) {
    t.show(factor)
    minX = s.min(t.ax, minX)
    maxX = s.max(t.ax, maxX)
  }
  const next = []
  for (let t of picks) {
    if (t.newPick) {
      const nextA = t.createA(picks)
      const nextB = t.createB(picks)
      if (nextA) next.push(nextA)
      if (nextB) next.push(nextB)
      t.newPick = false
    }
  }
  picks = picks.concat(next)
}
