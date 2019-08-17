import { Sketch, Vector } from '../../handcar'
import { City } from './city'
export const s = new Sketch()
s.size(800, 600)

const totalcities = 10
const cities = []
for (let i = 0; i < totalcities; i++) {
  cities.push(new City())
}

for (let city of cities) {
  city.computeDistances(cities)
}

let recordDistance = calcDistance(cities)
let bestEver = cities.slice()

s.draw = () => {
  const i = s.floor(s.random(cities.length))
  const j = s.floor(s.random(cities.length))
  swap(cities, i, j)
  const d = calcDistance(cities)
  if (d < recordDistance) {
    recordDistance = d
    bestEver = cities.slice()
  }
  //---------------------------------------------------------------------------//
  s.background(51)
  s.noFill()
  s.stroke(34, 139, 34)
  s.strokeWeight(12)
  s.beginShape()
  for (let city of bestEver) {
    s.vertex(city.pos.x, city.pos.y)
  }
  s.endShape()
  s.stroke(165, 242, 243)
  s.strokeWeight(1)
  s.beginShape()
  for (let city of cities) {
    s.vertex(city.pos.x, city.pos.y)
  }
  s.endShape()
  for (let city of cities) {
    city.show()
  }
}

function swap(a, i, j) {
  const temp = a[j]
  a[j] = a[i]
  a[i] = temp
}

function calcDistance(points) {
  let sum = 0
  for (let i = 0; i < points.length - 1; i++) {
    const d = points[i].dist(points[i + 1].id)
    sum += d
  }
  return sum
}
