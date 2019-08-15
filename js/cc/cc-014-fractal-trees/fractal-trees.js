import s from './fractal-trees-sketch'
import { Vector } from '../../handcar'
import { Branch } from './branch'

const tree = []
const a = new Vector(s.width / 2, s.height)
const b = new Vector(s.width / 2, s.height - 100)
tree.push(new Branch(a, b))

s.draw = () => {
  s.background(51)
  for (let branch of tree) {
    branch.show()
  }
}
