import { Sketch } from '/handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=8uyR-YU_0dg

q.size(400, 300)
q.background(255)

q.draw = () => {
  let xloc = q.randomGaussian()

  const sd = 60
  const mean = q.width / 2
  xloc = (xloc * sd) + mean

  q.noStroke()
  q.fill(0, 10)
  q.ellipse(xloc, q.height / 2, 16, 16)
}
