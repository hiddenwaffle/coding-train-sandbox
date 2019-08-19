import { Sketch } from '../../handcar'
const s = new Sketch()
s.size(200, 200)

s.createP()
const minSlider = s.createSlider(-2.5, 0, -2.5, 0.01)
const maxSlider = s.createSlider(0, 2.5, 2.5, 0.01)

// Reduce GC
const rgbScratch = [0, 0, 0]

s.draw = () => {
  const ca = s.map(s.mouseX, 0, s.width, -1, 1)
  const cb = s.map(s.mouseY, 0, s.height, -1, 1)
  const maxiterations = 100
  s.loadPixels()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      let a = s.map(x, 0, s.width, minSlider.value(), maxSlider.value())
      let b = s.map(y, 0, s.height, minSlider.value(), maxSlider.value())
      let n = 0
      while (n < maxiterations) {
        const aa = a * a
        const bb = b * b
        if (aa + bb > 4) {
          break
        }
        const twoab = 2 * a * b
        a = aa - bb + ca
        b = twoab + cb
        n++
      }
      const pix = (x + y * s.width) * 4
      if (n === maxiterations) {
        s.pixels[pix + 0] = 0
        s.pixels[pix + 1] = 0
        s.pixels[pix + 2] = 0
        s.pixels[pix + 3] = 255
      } else {
        let hue = Math.floor(Math.sqrt(n / maxiterations) * 361)
        s.HSVtoRGB(hue, 1, 1, rgbScratch)
        s.pixels[pix + 0] = rgbScratch[0]
        s.pixels[pix + 1] = rgbScratch[1]
        s.pixels[pix + 2] = rgbScratch[2]
        s.pixels[pix + 3] = 255
      }
    }
  }
  s.updatePixels()
}
