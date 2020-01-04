import { Sketch, Vector } from '../../handcar'
const s = new Sketch()
s.size(500, 500)

const points = []
const hull = []
const buffer = 20

for (let i = 0; i < 60; i++) { // 60 points
  points.push(new Vector(s.random(buffer, s.width - buffer),
                         s.random(buffer, s.height - buffer)))
}
points.sort((a, b) => a.x - b.x)
let leftMost = points[0]
let currentVertex = leftMost
hull.push(currentVertex)
let nextVertex = points[1]
let index = 2
let nextIndex = -1

s.draw = () => {
  s.background(0)
  s.strokeWeight(4)

  s.stroke(255)
  s.fill(255)
  for (let p of points) {
    s.ellipse(p.x, p.y, 8)
  }

  s.stroke(0, 0, 255)
  s.fill(0, 0, 255, 50)
  s.beginShape()
  for (let p of hull) {
    s.vertex(p.x, p.y)
  }
  s.endShape()

  s.stroke(0, 255, 0)
  s.fill(0, 255, 0)
  s.ellipse(leftMost.x, leftMost.y, 32)

  s.stroke(200, 0, 255)
  s.fill(200, 0, 255)
  s.ellipse(currentVertex.x, currentVertex.y, 32)

  s.stroke(0, 255, 0)
  s.line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y)

  const checking = points[index]
  s.stroke(255)
  s.line(currentVertex.x, currentVertex.y, checking.x, checking.y)

  const a = Vector.sub(nextVertex, currentVertex)
  const b = Vector.sub(checking, currentVertex)
  const crossZ = a.cross2D(b)
  if (crossZ < 0) {
    nextVertex = checking
    nextIndex = index
  }
  index += 1
  if (index === points.length) {
    if (nextVertex === leftMost) {
      console.log('done')
      s.noLoop()
    } else {
      hull.push(nextVertex)
      currentVertex = nextVertex
      index = 0
      nextVertex = leftMost
    }
  }
}
