import { Sketch } from '../../handcar'
export const s = new Sketch()
s.size(400, 400)

const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

const players = ['X', 'O']
let currentPlayer = s.floor(s.random(players.length))
const available = []
for (let j = 0; j < 3; j++) {
  for (let i = 0; i < 3; i++) {
    available.push([i, j])
  }
}

function equals3(a, b, c) {
  return a === b && b === c && a !== ''
}

function checkWinner() {
  let winner = null
  // one direction
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i]
      break
    }
  }
  // other direction
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0]
      break
    }
  }
  // diagonals
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0]
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0]
  }
  // cat
  if (winner === null && available.length === 0) {
    return 'tie'
  } else {
    return winner
  }
}

function nextTurn() {
  const index = s.floor(s.random(available.length))
  const spot = available.splice(index, 1)[0]
  const i = spot[0]
  const j = spot[1]
  board[i][j] = players[currentPlayer]
  currentPlayer = (currentPlayer + 1) % players.length
}

let lastTime = 0
s.draw = (time) => {
  if (time - lastTime < 1000) return
  lastTime = time
  s.background(220);
  const w = s.width / 3
  const h = s.height / 3
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
  let result = checkWinner()
  if (result !== null) {
    s.noLoop()
    s.createP(result).style('color', '#fff').style('font-size', '32pt')
  }
  nextTurn()
}
