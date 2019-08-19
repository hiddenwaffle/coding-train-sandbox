import { Sketch } from '../../handcar'
import { Spot } from './spot'
export const s = new Sketch()
s.size(400, 400)

export const cols = 25
export const rows = 25
export const w = s.width / cols
export const h = s.height / rows
const grid = new Array()

const openSet = new Set()
const closedSet = new Set()

// Making a 2D array
for (let i = 0; i < cols; i++) {
  grid[i] = []
  for (let j = 0; j < rows; j++) {
    grid[i][j] = new Spot(i, j)
  }
}
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    grid[i][j].addNeighbors(grid)
  }
}

const start = grid[0][0]
start.wall = false
const end = grid[cols - 1][rows - 1]
end.wall = false

openSet.add(start)

function heuristic(a, b) {
  return s.dist(a.i, a.j, b.i, b.j)
  // return s.abs(a.i - b.i) + s.abs(a.j - a.j)
}

s.draw = () => {
  s.background(51)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(255)
    }
  }
  for (let spot of closedSet.values()) {
    spot.show(s.color(255, 0, 0))
  }
  for (let spot of openSet.values()) {
    spot.show(s.color(0, 255, 0))
  }
  //-------------------------------------------------//
  if (openSet.size > 0) {
    let current = openSet.values().next().value
    for (let spot of openSet.values()) {
      if (spot.f < current.f) {
        current = spot
      }
    }
    if (current === end) {
      console.log('Done')
      s.noLoop()
    } else {
      openSet.delete(current)
      closedSet.add(current)
      for (let neighbor of current.neighbors.values()) {
        if (!closedSet.has(neighbor) && !neighbor.wall) {
          const tempG = current.g + 1
          let newPath = false
          if (openSet.has(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG
              newPath = true
            }
          } else {
            neighbor.g = tempG
            newPath = true
            openSet.add(neighbor)
          }
          if (newPath) {
            neighbor.h = heuristic(neighbor, end)
            neighbor.f = neighbor.g + neighbor.h
            neighbor.previous = current
          }
        }
      }
    }
    {
      const path = []
      let temp = current
      path.push(temp)
      while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
      }
      for (let spot of path) {
        s.fill(0, 255, 255)
        s.rect(spot.i * w, spot.j * w, w, w)
      }
    }
  } else {
    console.log('No solution')
    s.noLoop()
  }
}
