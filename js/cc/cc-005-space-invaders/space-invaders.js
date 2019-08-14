import s from './space-invaders-sketch'
import { Ship } from './ship'

const ship = new Ship

s.draw = () => {
  s.background(51)
  ship.show()
}

s.keyPressed = (keys) => {
  let dx = 0
  if (keys.get(s.RIGHT)) {
    dx += 1
  }
  if (keys.get(s.LEFT)) {
    dx += -1
  }
  ship.move(dx)
}
