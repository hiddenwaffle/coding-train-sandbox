import Draw from './draw'
const q = new Draw()

q.size(640, 360)
q.background(0, 0, 0)

q.stroke(0, 0, 255)
q.line(100, 50, 600, 250)

q.stroke(0, 255, 0)
q.fill(0, 255, 0)
q.rect(100, 50, 300, 200)

q.fill(255, 0, 0, 127)
q.rect(150, 50, 100, 300)
