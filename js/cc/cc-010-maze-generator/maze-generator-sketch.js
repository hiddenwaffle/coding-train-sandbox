import { Sketch } from '../../handcar'
import { Cell } from './cell'

const s = new Sketch()
s.size(601, 601)
export default s
export const w = 20
export const cols = Math.floor(s.width / w)
export const rows = Math.floor(s.height / w)
export const grid = []
for (let j = 0; j < cols; j++) {
  for (let i = 0; i < rows; i++) {
    grid.push(new Cell(i, j))
  }
}
