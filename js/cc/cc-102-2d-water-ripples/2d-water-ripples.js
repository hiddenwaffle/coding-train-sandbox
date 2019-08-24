import { Sketch } from '../../handcar'
const s = new Sketch()

const cols = 600
const rows = 400
s.size(cols, rows)
let current = []
for (let i = 0; i < cols; i++) {
  current[i] = []
  for (let j = 0; j < rows; j++) {
    current[i][j] = 0
  }
}
let previous = []
for (let i = 0; i < cols; i++) {
  previous[i] = []
  for (let j = 0; j < rows; j++) {
    previous[i][j] = 0
  }
}

const dampening = 0.99

s.createP('Click and drag the mouse to create ripples')

s.draw = () => {
  s.background(51)
  s.loadPixels()
  for (let i = 1; i < cols - 1; i++) {
    for (let j = 1; j < rows - 1; j++) {
      current[i][j] = (previous[i - 1][j] +
                       previous[i + 1][j] +
                       previous[i][j + 1] +
                       previous[i][j - 1]) / 2 -
                       current[i][j]
      current[i][j] *= dampening
      const index = (i + j * cols) * 4
      s.pixels[index + 0] = current[i][j] / 3
      s.pixels[index + 1] = current[i][j] / 2
      s.pixels[index + 2] = current[i][j]
      s.pixels[index + 3] = 255
    }
  }
  s.updatePixels()
  const temp = previous
  previous = current
  current = temp
}

s.mouseDragged = () => {
  const x = s.mouseX
  const y = s.mouseY
  const val = 500
  if (x > 1 && x < cols - 1 && y > 1 && y < rows - 1) {
    previous[x - 1][y - 1] = val
    previous[x][y - 1] = val
    previous[x + 1][y - 1] = val
    previous[x - 1][y] = val
    previous[x][y] = val
    previous[x + 1][y] = val
    previous[x - 1][y + 1] = val
    previous[x][y + 1] = val
    previous[x + 1][y + 1] = val
  }
}
