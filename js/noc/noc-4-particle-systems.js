import { Sketch, Vector } from '../handcar'
const q = new Sketch()

// https://www.youtube.com/watch?v=vdgiqMkFygc
// (and others about chapter 4)

class Particle {
  constructor(l) {
    this.acceleration = new Vector(0, 0.05)
    this.velocity = new Vector.random2D()
    this.location = l.copy()
    this.lifespan = 255
    this.r = Math.floor(q.random(256))
    this.g = Math.floor(q.random(256))
    this.b = Math.floor(q.random(256))
  }

  applyForce(force) {
    this.acceleration.add(force)
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
    this.lifespan -= 2
  }

  isDead() {
    return this.lifespan <= 0
  }

  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(this.r, this.g, this.b, this.lifespan)
    q.ellipse(this.location.x, this.location.y, 12, 12)
  }
}

class SquareParticle extends Particle {
  display() {
    q.stroke(0)
    q.strokeWeight(2)
    q.fill(this.r, this.g, this.b, this.lifespan)
    q.rect(this.location.x, this.location.y, 12, 12)
  }
}

class ParticleSystem {
  constructor(origin) {
    this.origin = origin
    this.particles = []
  }

  addParticle() {
    const typeIndex = Math.floor(q.random(2))
    const type = typeIndex === 0 ? Particle : SquareParticle
    this.particles.push(new type(this.origin))
  }

  applyForce(force) {
    for (let p of this.particles) {
      p.applyForce(force)
    }
  }

  run() {
    for (let p of this.particles) {
      p.update()
      p.display()
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1)
      }
    }
  }
}

q.size(640, 360)
const pss = []
pss.push(new ParticleSystem(new Vector(q.width / 2, 50)))
const gravity = new Vector(0, 0.05)
const wind = new Vector(0.1, 0)

q.draw = () => {
  q.background(255)
  for (let ps of pss) {
    ps.applyForce(gravity)
    if (q.mousePressed) {
      ps.applyForce(wind)
    }
    ps.addParticle()
    ps.run()
  }
}

q.mouseReleased = () => {
  if (q.mouseX >= 0 && q.mouseX <= q.width &&
      q.mouseY >= 0 && q.mouseY <= q.height) {
    pss.push(new ParticleSystem(new Vector(q.mouseX, q.mouseY)))
  }
}
