import { Sketch } from '../../handcar'
import { Bird } from './bird'
import { Pipe } from './pipe'
export const s = new Sketch()
s.size(400, 600)

// https://www.youtube.com/watch?v=cXgA1d_E-jY

const bird = new Bird()
const pipes = []
pipes.push(new Pipe)

s.draw = () => {
  s.background(51)
  for (let i = pipes.length - 1; i >= 0; i--) {
    const pipe = pipes[i]
    pipe.update()
    pipe.show()
    if (pipe.hits(bird)) {
      console.log('HIT')
    }
    if (pipe.offscreen()) {
      pipes.splice(i, 1)
    }
  }
  bird.update()
  bird.show()
  if (s.frameCount % 100 === 0) {
    pipes.push(new Pipe)
  }
}

s.mousePressed = () => {
  bird.up()
}
