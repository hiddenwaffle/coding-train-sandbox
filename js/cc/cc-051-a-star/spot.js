import { s, rows, cols, w, h } from './a-star'

export class Spot {
  constructor(i, j) {
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.neighbors = new Set()
    this.previous = null
  }

  show(col) {
    s.fill(col)
    s.noStroke()
    s.rect(this.i * w, this.j * h, w, h)
  }

  addNeighbors(grid) {
    const i = this.i
    const j = this.j
    if (i > 0) {
      this.neighbors.add(grid[i - 1][j])
    }
    if (i < cols - 1) {
      this.neighbors.add(grid[i + 1][j])
    }
    if (j > 0) {
      this.neighbors.add(grid[i][j - 1])
    }
    if (j < rows - 1) {
      this.neighbors.add(grid[i][j + 1])
    }
  }
}
