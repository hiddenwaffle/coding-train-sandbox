import { Sketch } from '../handcar'
import violetUrl from '/assets/violet.jpg'

const q = new Sketch()
q.size(360, 240)
q.stroke(255, 255, 0)

function start(violet) {
  q.draw = () => {
    q.background(0)
    q.image(violet, 0, 0)
  }
}

q.loadImage(violetUrl).then(start)
