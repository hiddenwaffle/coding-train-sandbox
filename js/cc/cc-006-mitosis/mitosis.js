import s from './mitosis-sketch'
import { Cell } from './cell'

const cell = new Cell()

s.draw = () => {
  s.background(51)
  cell.move()
  cell.show()
}
