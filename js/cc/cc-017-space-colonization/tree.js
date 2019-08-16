import s, { minDist, maxDist } from './space-colonization-sketch'
import { Leaf } from './leaf'
import { Vector } from '../../handcar'
import { Branch } from './branch'

export class Tree {
  constructor() {
    this.leaves = []
    for (let i = 0; i < 500; i++) {
      this.leaves.push(new Leaf())
    }
    this.branches = []
    // Construct the initial branch
    const pos = new Vector(s.width / 2, s.height)
    const dir = new Vector(0, -1)
    const root = new Branch(null, pos, dir)
    this.branches.push(root)
    let current = root
    let found = false
    while (!found) {
      for (let leaf of this.leaves) {
        const d = Vector.dist(current.pos, leaf.pos)
        if (d < maxDist) {
          found = true
        }
      }
      if (!found) {
        const branch = current.next()
        current = branch
        this.branches.push(current)
      }
    }
  }

  grow() {
    for (let leaf of this.leaves) {
      let closestBranch = null
      let record = 1000000 // as in closest distance
      for (let branch of this.branches) {
        const d = Vector.dist(leaf.pos, branch.pos)
        if (d < minDist) {
          leaf.reached = true
          closestBranch = null
          break
        } else if (d > maxDist) {
          // nothing
        } else if (closestBranch === null || d < record) {
          closestBranch = branch
          record = d
        }
      }
      if (closestBranch != null) {
        const newDir = Vector.sub(leaf.pos, closestBranch.pos)
        newDir.normalize()
        closestBranch.dir.add(newDir)
        closestBranch.count++
      }
    }
    for (let i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1)
      }
    }
    for (let i = this.branches.length - 1; i >= 0; i--) {
      const branch = this.branches[i]
      if (branch.count > 0) {
        branch.dir.div(branch.count + 1)
        this.branches.push(branch.next())
      }
      branch.reset()
    }
  }

  show() {
    for (let leaf of this.leaves) {
      leaf.show()
    }
    for (let branch of this.branches) {
      branch.show()
    }
  }
}
