import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(1200, 1200)
s.background(0)

for (let i = 1; i < 10000; i++) {
  const sequence = []
  let n = i
  do {
    sequence.push(n)
    n = collatz(n)
  } while (n != 1)
  sequence.push(1)
  sequence.reverse()
  const len = 10
  const angle = 0.13 // TODO: Not sure why 0.02 does not work like the video
  s.resetMatrix()
  s.translate(0, s.height / 2)
  for (let j = 0; j < sequence.length; j++) {
    const value = sequence[j]
    if (value % 2 === 0) {
      s.rotate(-angle)
    } else {
      s.rotate(angle)
    }
    s.strokeWeight(4)
    s.stroke(255, 50)
    s.line(0, 0, len, 0)
    s.translate(len, 0)
  }
}
console.log('finished')

function collatz(n) {
  if (n % 2 === 0) {
    // even
    return n / 2
  } else {
    // odd
    return (n * 3 + 1) / 2 // div by 2 for optimization
  }
}
