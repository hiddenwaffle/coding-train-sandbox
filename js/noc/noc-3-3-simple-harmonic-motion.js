import { Sketch } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=GvwPwIUSYqE

q.size(640, 360)

q.draw = () => {
  q.background(255)
  q.translate(q.width / 2, q.height / 2)

  const x = 0
  q.fill(127)
  q.stroke(0)
  q.line(0, 0, x, 0)
  q.ellipse(x, 0, 36, 36)
}