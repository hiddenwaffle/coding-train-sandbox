import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 300)

// https://www.youtube.com/watch?v=rX5p-QRP6R4

let radius = 128

s.draw = () => {
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  s.beginShape()
  let xoff = 0
  for (let a = 0; a < s.TWO_PI; a += 0.01) {
    const offset = s.map(s.noise(xoff + s.frameCount * 0.1,
                                 s.frameCount * 0.075),
                         0, 1, -5, 5)
    const r = radius + offset
    const x = r * s.cos(a)
    const y = r * s.sin(a)
    s.vertex(x, y)
    xoff += 0.1
  }
  s.endShape(s.CLOSE)
}
