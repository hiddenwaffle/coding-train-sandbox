import s, { w, cols, rows, grid } from './maze-generator-sketch'
import { Cell } from './cell'

// https://www.youtube.com/watch?v=HyK_Q5rrcr4
// and others

let current = grid[0]
let stack = []

s.draw = () => {
  //
  s.background(51)
  for (let cell of grid) {
    cell.show()
  }
  current.visited = true
  current.highlight()
  const next = current.checkNeighbors()
  if (next) {
    // Step 1
    next.visited = true
    // Step 2
    stack.push(current)
    // Step 3
    removeWalls(current, next)
    // Step 4
    current = next
  } else if (stack.length > 0) {
    current = stack.pop()
  }
}

function removeWalls(a, b) {
  const x = a.i - b.i
  if (x === 1) {
    a.walls[3] = false
    b.walls[1] = false
  } else if (x === -1) {
    a.walls[1] = false
    b.walls[3] = false
  }
  const y = a.j - b.j
  if (y === 1) {
    a.walls[0] = false
    b.walls[2] = false
  } else if (y === -1) {
    a.walls[2] = false
    b.walls[0] = false
  }
}
