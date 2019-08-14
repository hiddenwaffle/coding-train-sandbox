import s, { scl } from './snake-game-sketch'
import { PVector } from '../../handcar'
import { Snake } from './snake'

// https://www.youtube.com/watch?v=AaGK-fj-BAM
// Unfinished but good enough.
// Controls are a little wonky due to lowered frame rate.

const snake = new Snake()
let food = pickLocation()

function pickLocation() {
  const cols = Math.floor(s.width / scl)
  const rows = Math.floor(s.height / scl)
  return new PVector(Math.floor(s.random(cols)),
                     Math.floor(s.random(rows)))
}

let lastTime = 0
s.draw = (time) => {
  if (time - lastTime < 90) return
  lastTime = time
  s.background(51)
  snake.update()
  snake.show()

  if (snake.eat(food)) {
    food = pickLocation()
  }

  s.fill(255, 0, 100)
  s.rect(food.x * scl, food.y * scl, scl, scl)
}

s.keyTyped = () => {
  // TODO: This doesn't handle simultaneous key presses well?
  switch (s.keyCode) {
    case s.UP:
      snake.dir(0, -1)
      break
    case s.DOWN:
      snake.dir(0, 1)
      break
    case s.LEFT:
      snake.dir(-1, 0)
      break
    case s.RIGHT:
      snake.dir(1, 0)
      break
  }
}
