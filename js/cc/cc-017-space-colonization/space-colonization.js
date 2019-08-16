import s from './space-colonization-sketch'
import { Tree } from './tree'

const tree = new Tree()

s.draw = () => {
  s.background(51)
  tree.show()
  tree.grow()
}
