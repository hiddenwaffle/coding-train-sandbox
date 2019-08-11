import { Sketch } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=8uyR-YU_0dg

q.size(400, 300)

q.draw = () => {
  q.background(255)

  const h = (q.randomGaussian() * 10) + 100

  q.fill(0)
  q.ellipse(q.width / 2, q.height / 2, h, h)
}
