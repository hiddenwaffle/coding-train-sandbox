import s from './solar-system-sketch'

export class Planet {
  constructor(radius, distance, orbitSpeed) {
    this.radius = radius
    this.angle = s.random(s.TWO_PI)
    this.orbitSpeed = orbitSpeed
    this.distance = distance
    this.planets = []
  }

  orbit() {
    this.angle += this.orbitSpeed
    for (let planet of this.planets) {
      planet.orbit()
    }
  }

  spawnMoons(total, level=1) {
    for (let i = 0; i < total; i++) {
      const r = this.radius / (level * 1.75)
      const d = s.random(50, 300)
      const o = s.random(0.002, 0.01)
      const planet = new Planet(r, d / level, o)
      if (level < 2) {
        const num = Math.floor(s.random(0, 4))
        planet.spawnMoons(num, level + 1)
      }
      this.planets.push(planet)
    }
  }

  show() {
    s.ellipseMode(s.RADIUS)
    //
    s.pushMatrix()
    s.rotate(this.angle)
    s.translate(this.distance, 0)
    s.stroke(64)
    s.fill(255, 225)
    s.ellipse(0, 0, this.radius, this.radius)
    for (let planet of this.planets) {
      planet.show()
    }
    s.popMatrix()
  }
}
