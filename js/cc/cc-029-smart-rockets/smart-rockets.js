import { Sketch, Vector } from '../../handcar'
const s = new Sketch()
s.size(400, 300)

let lifespan = 400
const lifeP = s.createP()
let count = 0
const target = new Vector(s.width / 2, 50)
const rx = 100
const ry = 150
const rw = 200
const rh = 10
const maxforce = 0.2
let generation = 0

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes
    } else {
      this.genes = []
      for (let i = 0; i < lifespan; i++) {
        const force = Vector.random2D()
        force.setMag(maxforce)
        this.genes.push(force)
      }
    }
  }

  crossover(partner) {
    const newgenes = []
    const mid = Math.floor(s.random(this.genes.length))
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i]
      } else {
        newgenes[i] = partner.genes[i]
      }
    }
    return new DNA(newgenes)
  }

  mutation() {
    for (let i = 0; i < this.genes.length; i++) {
      if (s.random(1) < 0.01) {
        this.genes[i] = Vector.random2D()
        this.genes[i].setMag(maxforce)
      }
    }
  }
}

class Rocket {
  constructor(dna) {
    this.pos = new Vector(s.width / 2, s.height - 25)
    this.vel = new Vector()
    this.acc = new Vector()
    this.completed = false
    this.crashed = false
    this.dna = dna || new DNA()
    this.fitness = 0
  }

  applyForce(force) {
    this.acc.add(force)
  }

  calcFitness() {
    let d = s.dist(this.pos.x, this.pos.y, target.x, target.y)
    if (d === 0) d = 0.001 // Prevent div by zero
    this.fitness = s.map(d, 0, s.width, s.width, 0)
    if (this.completed) {
      this.fitness *= 10
    }
    if (this.crashed) {
      this.fitness /= 10
    }
  }

  update() {
    const d = s.dist(this.pos.x, this.pos.y, target.x, target.y)
    if (d < 10) {
      this.completed = true
      this.pos = target.copy()
    }
    if (this.pos.x > rx && this.pos.x < rx + rw &&
        this.pos.y > ry && this.pos.y < ry + rh) {
      this.crashed = true
    }
    if (this.pos.x > s.width || this.pos.x < 0) {
      this.crashed = true
    }
    if (this.pos.y > s.height || this.pos.y < 0) {
      this.crashed = true
    }
    this.applyForce(this.dna.genes[count])
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
      this.vel.limit(4)
    }
  }

  show() {
    s.pushMatrix()
    s.stroke(255, 192)
    s.fill(255, 128)
    s.translate(this.pos.x, this.pos.y)
    s.rotate(this.vel.heading2D())
    s.beginShape(s.TRIANGLES)
    s.vertex(7.5, 0)
    s.vertex(-7.5, -5)
    s.vertex(-7.5, 5)
    s.endShape()
    s.popMatrix()
  }
}

class Population {
  constructor() {
    this.rockets = []
    this.popsize = 25
    for (let i = 0; i < this.popsize; i++) {
      this.rockets.push(new Rocket())
    }
    this.matingPool = []
  }

  evaluate() {
    let maxfit = 0
    let sumfit = 0
    for (let rocket of this.rockets) {
      rocket.calcFitness()
      if (rocket.fitness > maxfit) {
        maxfit = rocket.fitness
        sumfit += rocket.fitness
      }
    }
    console.log('Generation', generation, 'Average Fitness', Math.floor(sumfit / this.rockets.length))
    if (maxfit === 0) maxfit = 0.001 // Prevent div by zero
    for (let rocket of this.rockets) {
      rocket.fitness /= maxfit
    }
    for (let rocket of this.rockets) {
      const n = Math.floor(rocket.fitness * 100)
      for (let j = 0; j < n; j++) {
        this.matingPool.push(rocket)
      }
    }
  }

  selection() {
    const newRockets = []
    for (let _ of this.rockets) {
      const parentA = s.random(this.matingPool).dna
      const parentB = s.random(this.matingPool).dna
      const child = parentA.crossover(parentB)
      child.mutation()
      newRockets.push(new Rocket(child))
    }
    this.rockets = newRockets
    generation++
  }

  run() {
    for (let rocket of this.rockets) {
      rocket.update()
      rocket.show()
    }
  }
}

let population = new Population()

s.draw = () => {
  s.background(0)
  population.run()
  lifeP.value(count)
  count++
  if (count === lifespan) {
    population.evaluate()
    population.selection()
    count = 0
  }
  s.fill(255)
  s.rect(rx, ry, rw, rh)
  s.ellipse(target.x, target.y, 16, 16)
}
