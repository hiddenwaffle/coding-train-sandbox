import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(200, 200)
// TODO: use pixelDensity()?

// https://www.youtube.com/watch?v=BV9ny785UNc

const dA = 1
const dB = 0.5
const feed = 0.055
const k = 0.062

let grid = []
let next = []
for (let x = 0; x < s.width; x++) {
  grid[x] = []
  next[x] = []
  for (let y = 0; y < s.height; y++) {
    grid[x][y] = { a: 1, b: 0 }
    next[x][y] = { a: 1, b: 0 }
  }
}

// Initialize a square of chemical B
for (let i = 100; i < 110; i++) {
  for (let j = 100; j < 110; j++) {
    grid[i][j].b = 1
  }
}

s.draw = () => {
  s.background(51)
  for (let x = 1; x < s.width - 1; x++) {
    for (let y = 1; y < s.height - 1; y++) {
      const a = grid[x][y].a
      const b = grid[x][y].b
      next[x][y].a = a +
                     (dA * laplaceA(x, y)) -
                     (a * b * b) +
                     (feed * (1 - a))
      next[x][y].b = b +
                     (dB * laplaceB(x, y)) +
                     (a * b * b) -
                     ((k + feed) * b)
      next[x][y].a = s.constrain(next[x][y].a, 0, 1)
      next[x][y].b = s.constrain(next[x][y].b, 0, 1)
    }
  }
  s.loadPixels()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      const pix = (x + y * s.width) * 4
      const a = next[x][y].a
      const b = next[x][y].b
      const c = s.constrain(Math.floor((a - b) * 255),
                            0,
                            255)
      s.pixels[pix + 0] = c
      s.pixels[pix + 1] = c
      s.pixels[pix + 2] = c
      s.pixels[pix + 3] = 255
    }
  }
  s.updatePixels()
  swap()
}

function laplaceA(x, y) {
  let sumA = 0
  sumA += grid[x][y].a * -1
  sumA += grid[x - 1][y].a * 0.2
  sumA += grid[x + 1][y].a * 0.2
  sumA += grid[x][y + 1].a * 0.2
  sumA += grid[x][y - 1].a * 0.2
  sumA += grid[x - 1][y - 1].a * 0.05
  sumA += grid[x + 1][y - 1].a * 0.05
  sumA += grid[x + 1][y + 1].a * 0.05
  sumA += grid[x - 1][y + 1].a * 0.05
  return sumA
}

function laplaceB(x, y) {
  let sumB = 0
  sumB += grid[x][y].b * -1
  sumB += grid[x - 1][y].b * 0.2
  sumB += grid[x + 1][y].b * 0.2
  sumB += grid[x][y + 1].b * 0.2
  sumB += grid[x][y - 1].b * 0.2
  sumB += grid[x - 1][y - 1].b * 0.05
  sumB += grid[x + 1][y - 1].b * 0.05
  sumB += grid[x + 1][y + 1].b * 0.05
  sumB += grid[x - 1][y + 1].b * 0.05
  return sumB
}

function swap() {
  const temp = grid
  grid = next
  next = temp
}
