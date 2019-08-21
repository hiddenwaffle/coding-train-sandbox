import { Edge } from './edge'
import { s } from './islamic-star-patterns'
import { Vector } from '../../handcar'

export class Polygon {
  constructor() {
    this.vertices = []
    this.edges = []
  }

  addVertex(x, y) {
    const a = new Vector(x, y)
    const total = this.vertices.length
    if (total > 0) {
      const prev = this.vertices[total - 1]
      const edge = new Edge(prev, a)
      this.edges.push(edge)
    }
    this.vertices.push(a)
  }

  close() {
    const total = this.vertices.length
    const last = this.vertices[total - 1]
    const first = this.vertices[0]
    const edge = new Edge(last, first)
    this.edges.push(edge)
  }

  hankin() {
    for (let edge of this.edges) {
      edge.hankin()
    }
    for (let edgea of this.edges) {
      for (let edgeb of this.edges) {
        if (edgea !== edgeb) {
          edgea.findEnds(edgeb)
        }
      }
    }
  }

  show() {
    for (let edge of this.edges) {
      edge.show()
    }
  }
}
