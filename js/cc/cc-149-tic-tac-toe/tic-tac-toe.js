import { Sketch } from '../../handcar'
export const s = new Sketch()
s.size(400, 400)

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

let players = ['X', 'O']
let currentPlayer = s.random(players)

s.draw = () => {
  s.background(220);
  let w = s.width / 3
  let h = s.height / 3
  s.line(w, 0, w, s.height)
  s.line(w * 2, 0, w * 2, s.height)
  s.line(0, h, s.width, h)
  s.line(0, h * 2, s.width, h * 2)
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2
      let y = h * j + h / 2
      let spot = board[i][j]
      s.noFill()
      s.strokeWeight(4)
      if (spot === players[1]) {
        s.ellipse(x, y, w / 2)
      } else if (spot === players[0]) {
        let xr = w / 4
        s.line(x - xr, y - xr, x + xr, y + xr)
        s.line(x + xr, y - xr, x - xr, y + xr)
      }
    }
  }
}
