import s from './space-colonization-sketch'
import { Leaf } from './leaf'

export class Tree {
  constructor() {
    this.leaves = []
    for (let i = 0; i < 500; i++) {
      this.leaves.push(new Leaf())
    }
  }

  show() {
    for (let leaf of this.leaves) {
      leaf.show()
    }
  }
}
