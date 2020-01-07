import { s } from './shared'
import { Cell } from './cell'

const w = 40
const totalBees = 10
const rows = s.floor(s.height / w)
const cols = s.floor(s.width / w)

const grid = make2DArray(rows, cols)
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j] = new Cell(i, j, w)
  }
}
// Pick totalBees spots
const options = []
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    options.push([i, j])
  }
}
for (let n = 0; n < totalBees; n++) {
  const index = s.floor(s.random(options.length))
  const choice = options[index]
  const i = choice[0]
  const j = choice[1]
  options.splice(index, 1)
  grid[i][j].bee = true
}
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j].countBees(rows, cols, grid)
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].revealed = true
    }
  }
}

s.mousePressed = () => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].contains(s.mouseX, s.mouseY)) {
        grid[i][j].reveal(rows, cols, grid)
        if (grid[i][j].bee) {
          gameOver()
        }
      }
    }
  }
}

s.draw = () => {
  s.background(255)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show()
    }
  }
}

function make2DArray(cols, rows) {
  const arr = []
  for (let i = 0; i < cols; i++) {
    arr.push(new Array(rows))
  }
  return arr
}
