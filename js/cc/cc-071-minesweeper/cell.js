import { s } from './shared'

export class Cell {
  constructor(i, j, w) {
    this.i = i
    this.j = j
    this.x = i * w
    this.y = j * w
    this.w = w
    this.neighborCount = 0
    this.bee = false
    this.revealed = false
  }

  show() {
    s.stroke(0)
    s.noFill()
    s.rect(this.x, this.y, this.w, this.w)
    if (this.revealed) {
      if (this.bee) {
        s.fill(127)
        s.ellipse(this.x + this.w * 0.5,
                  this.y + this.w * 0.5,
                  this.w * 0.5)
      } else {
        s.fill(127)
        s.rect(this.x, this.y, this.w, this.w)
        if (this.neighborCount > 0) {
          s.fill(0)
          s.textSize(20)
          s.text(this.neighborCount,
                 this.x + this.w / 2 - 3,
                 this.y + this.w / 2 + 7)
        }
      }
    }
  }

  countBees(rows, cols, grid) {
    if (this.bee) {
      this.neighborCount = -1
    } else {
      let total = 0
      for (let xoff = -1; xoff <= 1; xoff++) {
        for (let yoff = -1; yoff <= 1; yoff++) {
          const i = this.i + xoff
          const j = this.j + yoff
          if (i > -1 && i < cols && j > -1 && j < rows) {
            const neighbor = grid[i][j]
            if (neighbor.bee) {
              total++
            }
          }
        }
      }
      this.neighborCount = total
    }
  }

  contains(x, y) {
    return (x > this.x && x < this.x + this.w &&
            y > this.y && y < this.y + this.w)
  }

  reveal(rows, cols, grid) {
    this.revealed = true
    if (this.neighborCount === 0) {
      this.floodFill(rows, cols, grid)
    }
  }

  floodFill(rows, cols, grid) {
    for (let xoff = -1; xoff <= 1; xoff++) {
      for (let yoff = -1; yoff <= 1; yoff++) {
        const i = this.i + xoff
        const j = this.j + yoff
        if (i > -1 && i < cols && j > -1 && j < rows) {
          const neighbor = grid[i][j]
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal(rows, cols, grid)
          }
        }
      }
    }
  }
}
