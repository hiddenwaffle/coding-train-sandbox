import { Sketch } from '/handcar'
import violet from '/assets/violet.jpg'

const q = new Sketch()

async function load() {
  q.size(600, 400)
  return await q.loadImage(violet)
}

load().then((foo) => {
  q.draw = () => {
    q.background(0)
    q.image(foo, 0, 0)
  }
})
