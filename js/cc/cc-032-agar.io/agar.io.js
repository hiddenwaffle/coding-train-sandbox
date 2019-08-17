import { Sketch } from '../../handcar'
import { Blob } from './blob'
export const s = new Sketch()
s.size(600, 600)

const startRadius = 64

const blobs = []
let zoom = 1

const me = new Blob(0, 0, startRadius)
for (let i = 0; i < 200; i++) {
  const x = s.random(-s.width * 2, s.width * 2)
  const y = s.random(-s.height * 2, s.height * 2)
  blobs.push(new Blob(x, y, 16))
}

s.draw = () => {
  s.background(51)
  s.translate(s.width / 2, s.height / 2)
  const newzoom = startRadius / me.r
  zoom = s.lerp(zoom, newzoom, 0.1)
  s.scale(zoom)
  s.translate(-me.pos.x, -me.pos.y)
  me.show()
  me.update()
  for (let i = blobs.length - 1; i >= 0; i--) {
    const blob = blobs[i]
    if (me.eats(blob)) {
      blobs.splice(i, 1)
    }
    blob.show()
  }
}
