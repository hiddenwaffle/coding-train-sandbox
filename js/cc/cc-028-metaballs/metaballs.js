import { Sketch } from '../../handcar'
import { Blob } from './blob'
export const s = new Sketch()
s.size(320, 180)

// https://www.youtube.com/watch?v=ccYLb7cLB1I

const blobs = []
for (let i = 0; i < 4; i++) {
  blobs.push(new Blob(100, 100))
}

const rgb = [0, 0, 0]

s.draw = () => {
  s.background(51)
  s.loadPixels()
  for (let x = 0; x < s.width; x++) {
    for (let y = 0; y < s.height; y++) {
      const ix = x * 4
      const iy = y * 4
      const index = ix + iy * s.width
      let sum = 0
      for (let blob of blobs) {
        const d = s.dist(x, y, blob.pos.x, blob.pos.y)
        sum += 100 * blob.r / d
      }
      sum = s.map(sum, 0, 367, 0, 360) // 367 is the distance from 0, 0 to 320, 180
      s.HSVtoRGB(sum, 1, 1, rgb)
      s.pixels[index + 0] = rgb[0]
      s.pixels[index + 1] = rgb[1]
      s.pixels[index + 2] = rgb[2]
    }
  }
  s.updatePixels()
  for (let blob of blobs) {
    blob.update()
    // blob.show()
  }
}
