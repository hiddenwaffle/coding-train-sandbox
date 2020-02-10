import { Vector, Sketch } from '../../handcar'
const s = new Sketch()
s.size(512, 512)

// TODO: Unfinished
// https://www.youtube.com/watch?v=dSK-MW-zuAc

const order = 8
let N
let total
let path = []
let counter = 0

N = Math.floor(s.pow(2, order))
total = N * N

for (let i = 0; i < total; i++) {
  path[i] = hilbert(i)
  let len = s.width / N
  path[i].mult(len)
  path[i].add(len / 2, len / 2)
}

s.draw = () => {
  s.background(0)
  s.stroke(255)
  s.strokeWeight(1)
  s.noFill()
  for (let i = 1; i < counter; i++) {
    let h = s.map(i, 0, path.length, 0, 360)
    // TODO: Convert h to RGB
    s.stroke(h, 255, 255)
    s.line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y)
  }
  counter += 50
  if (counter >= path.length) {
    counter = 0
  }
}

function hilbert(i) {
  const points = [
    new Vector(0, 0),
    new Vector(0, 1),
    new Vector(1, 1),
    new Vector(1, 0)
  ]

  let index = i & 3
  let v = points[index]

  for (let j = 1; j < order; j++) {
    i = i >>> 2
    index = i & 3
    let len = s.pow(2, j)
    if (index == 0) {
      let temp = v.x
      v.x = v.y
      v.y = temp
    } else if (index == 1) {
      v.y += len
    } else if (index == 2) {
      v.x += len
      v.y += len
    } else if (index == 3) {
      let temp = len - 1 - v.x
      v.x = len - 1 - v.y
      v.y = temp
      v.x += len
    }
  }
  return v
}
