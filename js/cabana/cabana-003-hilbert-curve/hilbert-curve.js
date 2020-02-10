import { Vector, Sketch } from '../../handcar'

const s = new Sketch()
s.size(512, 512)
s.background(0)

const order = 1
const N = Math.floor(Math.pow(2, order))
const total = N * N
const path = []
const scratch = new Vector()

for (let i = 0; i < total; i++) {
  path[i] = hilbert(i)
  const len = s.width / N
  path[i].mult(len)
  scratch.set(len / 2, len / 2)
  path[i].add(scratch)
}

function hilbert(i) {
  const points = [
    new Vector(0, 0),
    new Vector(0, 1),
    new Vector(1, 1),
    new Vector(1, 0)
  ]
  return points[i]
}

let counter = 0
s.draw = () => {
  s.background(0)
  s.stroke(255)
  s.strokeWeight(2)
  s.noFill()
  s.beginShape()
  for (let i = 0; i < path.length; i++) {
    s.vertex(path[i].x, path[i].y)
  }
  s.endShape()
  s.strokeWeight(4)
  for (let i = 0; i < path.length; i++) {
    s.point(path[i].x, path[i].y)
    s.text(i, path[i].x + 5, path[i].y)
  }
}
