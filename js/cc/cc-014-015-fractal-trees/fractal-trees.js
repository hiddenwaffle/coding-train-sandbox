import s from './fractal-trees-sketch'
import { Vector } from '../../handcar'
import { Branch } from './branch'

let tree = []
let leaves = []
const a = new Vector(s.width / 2, s.height)
const b = new Vector(s.width / 2, s.height - 100)
const root = new Branch(a, b)
tree.push(root)

let count = 0

s.mousePressed = () => {
  const newBranches = []
  for (let branch of tree) {
    if (!branch.finished) {
      newBranches.push(branch.branchA())
      newBranches.push(branch.branchB())
      branch.finished = true
    }
  }
  tree = tree.concat(newBranches)
  count++
  if (count === 6) {
    for (let branch of tree) {
      if (!branch.finished) {
        leaves.push(branch.end.copy())
      }
    }
  }
}

s.draw = () => {
  s.background(51)
  for (let branch of tree) {
    branch.show()
    // branch.jitter()
  }
  for (let leaf of leaves) {
    s.fill(255, 0, 100, 100)
    s.noStroke()
    s.ellipse(leaf.x, leaf.y, 8, 8)
    leaf.y += s.random(0, 1)
  }
}
