import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 300)

let values = []
for (let i = 0; i < s.width; i++) {
  // values.push(s.floor(s.random(s.height)))
  values.push(s.noise(i / 100) * s.height)
}

let i = 0
let j = 0

s.draw = () => {
  s.background(0)
  s.stroke(255)
  for (let i = 0; i < values.length; i++) {
    s.line(i, s.height, i, s.height - values[i])
  }
  for (let n = 1; n < 50; n++) { // times per frame
    const a = values[j]
    const b = values[j + 1]
    if (a > b) {
      swap(values, j, j + 1)
    }
    if (i < values.length) {
      j = j + 1
      if (j >= values.length - i - 1) {
        j = 0
        i += 1
      }
    }
  }
  if (i >= values.length) {
    console.log('finished')
    s.noLoop()
  }
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}
