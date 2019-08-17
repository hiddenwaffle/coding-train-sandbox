import { Sketch, Vector } from '../../handcar'
import { Walker } from './walker'
export const s = new Sketch()
s.size(400, 400)

export const r = 4
const tree = []
const walkers = []
const maxWalkers = 300
const iterations = 300

tree.push(new Walker(s.width / 2, s.height / 2))
for (let i = 0; i < maxWalkers; i++) {
  walkers.push(new Walker())
}

s.draw = () => {
  for (let n = 0; n < iterations; n++) {
    for (let i = walkers.length - 1; i >= 0; i--) {
      const walker = walkers[i]
      walker.walk()
      if (walker.checkStuck(tree)) {
        tree.push(walker)
        walkers.splice(i, 1)
      }
    }
  }
  s.background(51)
  for (let branch of tree) {
    branch.show()
  }
  for (let walker of walkers) {
    walker.show()
  }
  while (walkers.length < maxWalkers) {
    walkers.push(new Walker())
  }
}
