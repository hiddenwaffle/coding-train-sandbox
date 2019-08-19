import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(400, 400)

let n = 0
const c = 4

s.background(0)

const rgb = [0, 0, 0]

s.draw = () => {
  const a = n * s.radians(137.5)
  const r = c * Math.sqrt(n)
  const x = r * Math.cos(a) + s.width / 2
  const y = r * Math.sin(a) + s.height / 2
  s.HSVtoRGB(198, 1, (a % 100) / 100, rgb)
  s.fill(rgb[0], rgb[1], rgb[2])
  s.noStroke()
  s.ellipse(x, y, 4, 4)
  n++
}
