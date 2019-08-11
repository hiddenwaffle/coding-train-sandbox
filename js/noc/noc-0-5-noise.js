import { Sketch } from '/handcar'
const q = new Sketch()

q.size(600, 400)
let t = 0

q.draw = () => {
  q.background(0)
  q.fill(255)

  let x = q.noise(t)
  x = q.map(x, 0, 1, 0, q.width)
  q.ellipse(x, q.height / 2, 40, 40)

  t += 0.01
}
