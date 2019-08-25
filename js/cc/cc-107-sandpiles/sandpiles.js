import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(600, 600)

// https://www.youtube.com/watch?v=diGjw5tghYU
// Only a few topple()s at a time, otherwise CPU is maxed out

function makePile() {
  const pile = []
  for (let i = 0; i < s.width; i++) {
    pile[i] = []
    for (let j = 0; j < s.height; j++) {
      pile[i][j] = 0
    }
  }
  return pile
}

let sandpiles = makePile()
sandpiles[s.width / 2][s.height / 2] = 100000000

function topple() {
  let nextpiles = makePile()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      nextpiles[x][y] = sandpiles[x][y]
    }
  }
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      const num = sandpiles[x][y]
      if (num >= 4) {
        nextpiles[x][y] -= 4
        if (x + 1 < s.width) nextpiles[x + 1][y]++
        if (x - 1 >= 0) nextpiles[x - 1][y]++
        if (y + 1 < s.height) nextpiles[x][y + 1]++
        if (y - 1 >= 0) nextpiles[x][y - 1]++
      }
    }
  }
  const tmp = sandpiles
  sandpiles = nextpiles
  nextpiles = tmp
}

function render() {
  s.loadPixels()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      const num = sandpiles[x][y]
      let r = 51; let g = 51; let b = 51
      if (num === 0) {
        r = 29; g = 43; b = 83
      } else if (num === 1) {
        r = 41; g = 173; b = 255
      } else if (num === 2) {
        r = 0; g = 228; b = 54
      } else if (num === 3) {
        r = 255; g = 163; b = 0
      }
      const index = (x + y * s.width) * 4
      s.pixels[index    ] = r
      s.pixels[index + 1] = g
      s.pixels[index + 2] = b
      // s.pixels[index + 3] = 255
    }
  }
  s.updatePixels()
}

s.draw = () => {
  render()
  topple()
  topple()
}
