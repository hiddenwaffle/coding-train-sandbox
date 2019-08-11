import { Sketch } from '../handcar'
import violetUrl from '/assets/violet.jpg'

const q = new Sketch()
q.size(360, 240)

function start(violet) {
  q.draw = () => {
    q.background(0)
    // q.tint(255, 0, 0)
    q.image(violet, 10, 10, q.mouseX, q.mouseY)

    q.fill(0, 255, 0)
    q.ellipse(300, 200, 10, 10)
  }
}

q.loadImage(violetUrl).then(start)
