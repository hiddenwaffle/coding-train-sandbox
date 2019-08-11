import { Sketch } from './handcar'
const q = new Sketch()

q.size(640, 360)

q.draw = () => {
  q.background(51)
  q.fill(127)
  let c = q.color(0, 255, 192)
  q.stroke(c)
  q.strokeWeight(2)
  q.beginShape()
  q.vertex(100, 50)
  q.vertex(114, 80)
  q.vertex(147, 85)
  q.vertex(123, 107)
  q.vertex(129, 140)
  q.vertex(100, 125)
  q.vertex(71, 140)
  q.vertex(77, 107)
  q.vertex(53, 85)
  q.vertex(86, 80)
  q.endShape(q.CLOSE)
}
