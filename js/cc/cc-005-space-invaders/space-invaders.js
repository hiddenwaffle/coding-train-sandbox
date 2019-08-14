import s from './space-invaders-sketch'
import { Ship } from './ship'
import { Flower } from './flower'
import { Drop } from './drop'

const ship = new Ship
const flowers = []
for (let i = 0; i < 6; i++) {
  flowers.push(new Flower(i * 80 + 80, 60))
}
const drops = []

s.draw = () => {
  s.background(51)
  ship.show()
  let edge = false
  for (let flower of flowers) {
    flower.move()
    flower.show()
    if (flower.x > s.width || flower.x < 0) {
      edge = true
    }
  }
  if (edge) {
    for (let flower of flowers) {
      flower.shiftDown()
    }
  }
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i]
    drop.move()
    drop.show()
    // Collision check
    const flower = drop.hits(flowers)
    if (flower) {
      drops.splice(i, 1)
      flower.grow()
    }
  }
}

s.keyPressed = (keys) => {
  let dx = 0
  if (keys.get(s.RIGHT)) {
    dx += 1
  }
  if (keys.get(s.LEFT)) {
    dx += -1
  }
  ship.move(dx)
}

s.keyTyped = (keyCode) => {
  if (keyCode === s.SPACE) {
    drops.push(new Drop(ship.x, s.height))
  }
}
