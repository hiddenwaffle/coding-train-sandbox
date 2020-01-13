import { Sketch, Vector } from '../../handcar'
const s = new Sketch()
s.size(600, 600)

const percent = 0.5
const n = 5
const centerOffset = new Vector(s.width / 2, s.height / 2)

let points
let current
let previous

function reset() {
  points = []
  for (let i = 0; i < n; i++) {
    const angle = i * s.TWO_PI / n
    const v = Vector.fromAngle(angle)
    v.mult(s.width / 2)
    v.add(centerOffset)
    points.push(v)
  }
  current = new Vector(s.random(s.width),
                       s.random(s.height))

  s.background(0)
  s.stroke(255)
  s.strokeWeight(4)
  for (let p of points) {
    s.point(p.x, p.y)
  }
  s.strokeWeight(1)
}

reset()

s.draw = () => {
  if (s.frameCount % 150 === 0) {
    reset()
  }
  for (let i = 0; i < 1000; i++) {
    s.stroke(255)
    const next = s.random(points)
    if (next !== previous) {
      current.x = s.lerp(current.x, next.x, percent)
      current.y = s.lerp(current.y, next.y, percent)
      s.point(current.x, current.y)
    }
    previous = next
  }
}
