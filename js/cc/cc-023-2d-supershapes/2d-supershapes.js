import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

const n1 = 1
const n2 = 1
const n3 = 1
const a = 1
const b = 1
const radius = 100
const total = 500
const increment = s.TWO_PI / total

const slider = s.createSlider(0, 10, 5, 1)

function supershape(theta) {
  const m = slider.value()
  let part1 = (1 / a) * Math.cos(theta * m / 4)
  part1 = Math.abs(part1)
  part1 = Math.pow(part1, n2)
  let part2 = (1 / b) * Math.sin(theta * m / 4)
  part2 = Math.abs(part2)
  part2 = Math.pow(part2, n3)
  let part3 = Math.pow(part1 + part2, 1 / n1)
  if (part3 === 0) return 0
  return 1 / part3
}

s.draw = () => {
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  s.stroke(255)
  s.noFill()
  s.beginShape()
  for (let angle = 0; angle < s.TWO_PI; angle += increment) {
    const r = supershape(angle)
    const x = radius * r * Math.cos(angle)
    const y = radius * r * Math.sin(angle)
    s.vertex(x, y)
  }
  s.endShape(s.CLOSE)
}
