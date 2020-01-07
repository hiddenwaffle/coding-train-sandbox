import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 300)

let values = []
const states = []
for (let i = 0; i < s.width; i++) {
  // values.push(s.floor(s.random(s.height)))
  values.push(s.noise(i / 100) * s.height)
  states[i] = -1
}

quickSort(values, 0, values.length - 1)

s.draw = () => {
  s.background(0)
  for (let i = 0; i < values.length; i++) {
    if (states[i] === 0) {
      s.stroke('#e0777d')
    } else if (states[i] === 1) {
      s.stroke('#d6ffb7')
    } else {
      s.stroke(255)
    }
    s.line(i, s.height, i, s.height - values[i])
  }
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return
  }
  const index = await partition(arr, start, end)
  states[index] = -1
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ])
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1
  }
  let pivotIndex = start
  const pivotValue = arr[end]
  states[pivotIndex] = 0
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex)
      states[pivotIndex] = -1
      pivotIndex++
      states[pivotIndex] = 0
    }
  }
  await swap(arr, pivotIndex, end)
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1
    }
  }
  return pivotIndex
}

async function swap(arr, i, j) {
  await sleep(1)
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
