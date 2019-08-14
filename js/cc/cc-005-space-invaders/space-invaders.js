import s from './space-invaders-sketch'
import { Ship } from './ship'

const ship = new Ship

s.draw = () => {
  s.background(51)
  ship.show()
}

s.keyPressed = () => {
  let dx = 0
  if (s.keyCode === s.RIGHT) {
    dx = 1
  } else if (s.keyCode === s.LEFT) {
    dx = -1
  }
  ship.move(dx)
}
