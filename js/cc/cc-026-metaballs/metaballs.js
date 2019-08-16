import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(640, 360)

s.draw = () => {
  s.background(51)
  s.loadPixels()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      const index = (x * 4) + (y * 4 * s.width)
      s.pixels[index + 0] = 255
      s.pixels[index + 1] = 0
      s.pixels[index + 2] = 255
    }
  }
  s.updatePixels()
}
