import { Sketch, Vector } from '../../handcar'
export const s = new Sketch()
s.size(400, 300)

// https://www.youtube.com/watch?v=goUlyp4rwiU

let vals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

s.draw = () => {
  s.background(51)
  let largestI = -1
  for (let i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i
    }
  }
  if (largestI == -1) {
    s.noLoop()
    console.log('finished')
  }
  let largestJ = -1
  for (let j = 0; j < vals.length; j++) {
    if (vals[largestI] < vals[j]) {
      largestJ = j
    }
  }
  swap(vals, largestI, largestJ)
  const endArray = vals.splice(largestI + 1)
  endArray.reverse()
  vals = vals.concat(endArray)
  //
  s.textSize(64)
  s.text(vals.join(''), 20, s.height / 2)
}

function swap(a, i, j) {
  const temp = a[j]
  a[j] = a[i]
  a[i] = temp
}
