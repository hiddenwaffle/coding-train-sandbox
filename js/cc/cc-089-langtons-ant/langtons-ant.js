import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(1200, 600)

const WHITE = 255
const BLACK = 0

const grid = []
for (let i = 0; i < s.width; i++) {
  grid[i] = []
  for (let j = 0; j < s.height; j++) {
    grid[i][j] = WHITE
  }
}

let x = s.width / 2
let y = s.height / 2
grid[x][y] = BLACK

//------------------//
// Direction-related
//------------------//
const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3
let dir = UP
function turnLeft() {
  dir--
  if (dir < UP) dir = LEFT
}
function turnRight() {
  dir++
  if (dir > LEFT) dir = UP
}
function moveForward() {
  if (dir === UP) y--
  if (dir === RIGHT) x++
  if (dir === DOWN) y++
  if (dir === LEFT) x--
  if (x > s.width - 1) x = 0
  if (x < 0) x = s.width - 1
  if (y > s.height - 1) y = 0
  if (y < 0) y = s.height - 1
}

function step() {
  const state = grid[x][y]
  if (state === WHITE) {
    turnRight()
    grid[x][y] = BLACK
    moveForward()
  } else if (state === BLACK) {
    turnLeft()
    grid[x][y] = WHITE
    moveForward()
  }
}

s.background(255)
s.draw = () => {
  for (let n = 0; n < 1000; n++) {
    step()
  }
  s.loadPixels()
  for (let i = 0; i < s.width; i++) {
    for (let j = 0; j < s.height; j++) {
      const pix = (i + s.width * j) * 4
      const val = grid[i][j]
      s.pixels[pix    ] = val
      s.pixels[pix + 1] = val
      s.pixels[pix + 2] = val
    }
  }
  s.updatePixels()
}
