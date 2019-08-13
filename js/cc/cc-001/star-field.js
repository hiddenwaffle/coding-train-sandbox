import s from './star-field-sketch'
import { Star } from './star'

const stars = []
for (let i = 0; i < 400; i++) {
  stars.push(new Star())
}

s.draw = () => {
  s.background(0)
  s.translate(s.width / 2, s.height / 2)
  for (let star of stars) {
    star.update()
    star.show()
  }
}
