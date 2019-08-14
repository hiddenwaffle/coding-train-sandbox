import s from './mitosis-sketch'
import { Cell } from './cell'

// https://www.youtube.com/watch?v=jxGS3fKPKJA
// Also added separation force and OpenSimplex noise movement

const cells = []
cells.push(new Cell())
cells.push(new Cell())

s.draw = () => {
  s.background(51)

  for (let cell of cells) {
    cell.move()
    cell.edges()
    cell.show()
  }
}

s.mousePressed = () => {
  for (let i = cells.length - 1; i >= 0; i--) {
    const cell = cells[i]
    if (cell.clicked(s.mouseX, s.mouseY)) {
      const [cellA, cellB] = cell.mitosis()
      cells.splice(i, 1)
      cells.push(cellA)
      cells.push(cellB)
    }
  }
}
