import { Sketch } from '../../handcar'
import { Blackhole } from './black-hole'
import { Photon } from './photon'
export const s = new Sketch()
s.size(800, 600)

export const c = 30
export const G = 2
const m87 = new Blackhole(s.width / 2, s.height / 2, 3000)

const particles = []
const start = s.height / 2
// const end = s.height / 2 - m87.rs * 2.6
for (let y = 0; y < start; y += 5) {
  particles.push(new Photon(s.width - 20, y))
}

s.draw = () => {
  s.background(255)
  m87.show()
  for (let p of particles) {
    m87.pull(p)
    p.update()
    p.show()
  }
}
