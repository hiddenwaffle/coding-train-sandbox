import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(800, 600)

// https://www.youtube.com/watch?v=f0lkz2gSsIk
// Just the 2D part

let x = 0.01
let y = 0
let z = 0
let hu = 0

const a = 10
const b = 28
const c = 8 / 3

s.background(0)

s.draw = () => {
  const dt = 0.01
  const dx = (a * (y - x)) * dt
  const dy = (x * (b - z) - y) * dt
  const dz = (x * y - c * z) * dt
  x = x + dx
  y = y + dy
  z = z + dz
  s.translate(s.width / 2, s.height / 2)
  s.scale(5)
  s.stroke(hu, 255, 255)
  s.point(x, y)
  hu += 0.1
  if (hu > 255) hu = 0
}
