import { Sketch } from '../../handcar'
import { Ship } from './ship'
import { Asteroid } from './asteroid'
import { Laser } from './laser'
export const s = new Sketch()
s.size(640, 480)

const ship = new Ship()
const asteroids = []
for (let i = 0; i < 5; i++) {
  asteroids.push(new Asteroid())
}
const lasers = []

s.stroke(255)
s.strokeWeight(2)
s.noFill()

s.draw = () => {
  s.background(51)
  ship.highlight = false
  for (let i = asteroids.length - 1; i >= 0; i--) {
    const asteroid = asteroids[i]
    if (ship.hits(asteroid)) {
      ship.highlight = true
    }
    asteroid.update()
    asteroid.edges()
    asteroid.render()
  }
  ship.update()
  ship.edges()
  ship.render()
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i]
    laser.update()
    laser.render()
    for (let j = asteroids.length - 1; j >= 0; j--) {
      const asteroid = asteroids[j]
      if (laser.hits(asteroid)) {
        lasers.splice(i, 1)
        asteroids.splice(j, 1)
        asteroids.push(...asteroid.breakup())
      }
    }
  }
  for (let i = lasers.length - 1; i >= 0; i--) {
    const laser = lasers[i]
    if (laser.offscreen()) lasers.splice(i, 1)
  }
}

s.keyTyped = (key) => {
  if (key === ' ') {
    lasers.push(new Laser(ship.pos, ship.heading))
  }
}

s.keyPressed = (keys) => {
  if (keys.get('arrowleft')) {
    ship.turn(-0.1)
  }
  if (keys.get('arrowright')) {
    ship.turn(0.1)
  }
  if (keys.get('arrowup')) {
    ship.boost()
  }
  if (keys.get('arrowdown')) {
    ship.break()
  }
}
