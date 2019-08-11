import { Sketch } from '/handcar'
const q = new Sketch()

async function load() {
  q.size(600, 400)
  return await q.loadImage('hop.jpg')
}

load().then((hog) => {
  q.draw = () => {
    q.background(0)
    q.image(hog, 0, 0)
  }
})
