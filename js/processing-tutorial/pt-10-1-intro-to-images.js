import { Sketch } from '../handcar'
import violetUrl from '/assets/violet.jpg'

const q = new Sketch()
q.size(360, 240)

function start(violet) {
  q.draw = () => {
    q.background(128)
    q.fill(0, 255, 255)
    q.ellipse(250, 200, 40, 40)

    q.tint(0, 153, 204)
    // q.tint(255, 128) // This should make it transparent
    // q.image(violet, 10, 10, q.mouseX, q.mouseY)
    q.image(violet, q.width / 4, q.height / 4)

    q.fill(0, 255, 0)
    q.ellipse(150, 150, 20, 20)
  }
}

q.loadImage(violetUrl).then(start)
