import { Sketch, Vector } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

// https://www.youtube.com/watch?v=flQgnCUxHlw

const r = 4 // number of distance between the points
const k = 30 // number of times to try a sample before giving up
const grid = []
const ordered = []
const w = r / s.sqrt(2)
const active = []

// Step 0
const cols = s.floor(s.width / w)
const rows = s.floor(s.height / w)
for (let i = 0; i < cols * rows; i++) {
  grid[i] = undefined
}

// Step 1
const x = s.width / 2
const y = s.height / 2
const i = s.floor(x / w)
const j = s.floor(y / w)
const pos = new Vector(x, y)
grid[i + j * cols] = pos
active.push(pos)

s.strokeWeight(r * 0.5)

const rgb = [0, 0, 0]

s.draw = () => {
  s.background(0)
  if (active.length > 0) {
    const randIndex = s.floor(s.random(active.length))
    const pos = active[randIndex]
    let found = false
    for (let n = 0; n < k; n++) {
      const sample = Vector.random2D()
      const m = s.random(r, 2 * r)
      sample.setMag(m)
      sample.add(pos)
      const col = s.floor(sample.x / w)
      const row = s.floor(sample.y / w)
      if (col > -1 &&
          row > -1 &&
          col < cols &&
          row < rows &&
          !grid[col + row * cols]) {
        let ok = true
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const index = (col + i) + (row + j) * cols
            const neighbor = grid[index]
            if (neighbor) {
              const d = Vector.dist(sample, neighbor)
              if (d < r) {
                ok = false
              }
            }
          }
        }
        if (ok) {
          found = true
          grid[col + row * cols] = sample
          active.push(sample)
          ordered.push(sample)
          // break // Comment this out to find multiple points per frame
        }
      }
    }
    if (!found) {
      active.splice(randIndex, 1)
    }
  }
  let a = 0
  for (let p of ordered) {
    s.HSVtoRGB(a % 100, 99, 99, rgb)
    s.stroke(rgb[0], rgb[1], rgb[2])
    s.point(p.x, p.y)
    a++
  }
  // for (let p of grid) {
  //   if (p) {
  //     s.point(p.x, p.y)
  //   }
  // }
  // s.stroke(255, 0, 255)
  // for (let p of active) {
  //   s.point(p.x, p.y)
  // }
}
