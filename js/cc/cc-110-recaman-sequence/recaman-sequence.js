import { Sketch } from '../../handcar'
import { Arc } from './arc'
export const s = new Sketch()
s.size(800, 480)

// https://www.youtube.com/watch?v=DhFZfzOvNTU
// Skipping the part 2for musical notes

const numbers = []
let count = 1
const sequence = []
let index = 0
numbers[index] = true
sequence.push(index)
const arcs = []
let biggest = 0

function step() {
  let next = index - count
  if (next < 0 || numbers[next]) {
    next = index + count
  }
  numbers[next] = true
  sequence.push(next)

  const a = new Arc(index, next, count % 2)
  arcs.push(a)

  index = next
  if (index > biggest) {
    biggest = index
  }
  count++
}

s.stroke(255)
s.strokeWeight(0.5)
s.noFill()
s.draw = () => {
  s.background(0)
  s.translate(0, s.height / 2)
  s.scale(s.width / biggest)
  step()
  for (let a of arcs) {
    a.show()
  }
  // console.log(arcs.length)
  if (arcs.length > 1000) { // Set to a low number for cool effect
    arcs.splice(0, 1)
  }
}
