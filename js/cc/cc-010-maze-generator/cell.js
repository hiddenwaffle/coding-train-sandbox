import s, { w, rows, cols, grid } from './maze-generator-sketch'

function index(i, j) {
  if (i < 0 || j < 0 || i >= cols || j >= rows) {
    return -1
  }
  return i + j * cols
}

export class Cell {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.walls = [true, true, true, true]
    this.visited = false
  }

  checkNeighbors() {
    const neighbors = []
    const top = grid[index(this.i, this.j - 1)]
    const right = grid[index(this.i + 1, this.j)]
    const bottom = grid[index(this.i, this.j + 1)]
    const left = grid[index(this.i - 1, this.j)]
    if (top && !top.visited) {
      neighbors.push(top)
    }
    if (right && !right.visited) {
      neighbors.push(right)
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom)
    }
    if (left && !left.visited) {
      neighbors.push(left)
    }
    if (neighbors.length > 0) {
      const r = Math.floor(s.random(0, neighbors.length))
      return neighbors[r]
    } else {
      return undefined
    }
  }

  highlight() {
    const x = this.i * w
    const y = this.j * w
    s.noStroke()
    s.fill(0, 0, 255, 100)
    s.rect(x, y, w, w)
  }

  show() {
    const x = this.i * w
    const y = this.j * w
    s.stroke(255)
    if (this.walls[0]) s.line(x, y, x + w, y) // top
    if (this.walls[1]) s.line(x + w, y, x + w, y + w) // right
    if (this.walls[2]) s.line(x, y + w, x + w, y + w) // bottom
    if (this.walls[3]) s.line(x, y, x, y + w) // left
    if (this.visited) {
      s.noStroke()
      s.fill(255, 0, 255, 128)
      s.rect(x, y, w, w)
    }
  }
}
