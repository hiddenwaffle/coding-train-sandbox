import s from './star-field-sketch'
import { Star } from './star'

const stars = []
for (let i = 0; i < 100; i++) {
  stars.push(new Star())
}

s.draw = () => {
  s.background(0)
  for (let star of stars) {
    star.update()
    star.show()
  }
}
