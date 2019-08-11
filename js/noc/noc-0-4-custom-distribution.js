import { Sketch } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=DfziDXHYoik

q.size(400, 300)
const vals = []
const norms = []

q.draw = () => {
  q.background(100)

  const n = montecarlo()

  const index = Math.floor(n * q.width)
  vals[index]++
  q.stroke(255)

  const normalization = false
  const maxy = 0

  for (let x = 0; x < vals.length; x++) {
    q.line(x, q.height, x, q.height - norms[x])
    if (vals[x] > q.height) normalization = true
    if (vals[x] > maxy) maxy = vals[x]
  }

  for (let x = 0; x < vals.length; x++) {
    if (normalization) norms[x] = (vals[x] / maxy)
    else norms[x] = vals[x]
  }
}

function montecarlo() {
  let foundone = false
  let hack = 0
  while (!foundone && hack < 10000) {
    const r1 = q.random(1)
    const r2 = q.random(1)
    const y = r1 * r1
    if (r2 < y) {
      foundone = true
      return r1
    }
    hack++
  }
  return 0
}
