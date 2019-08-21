import { Sketch } from '../../handcar'
import { Polygon } from './polygon'
export const s = new Sketch()

// Bookmark at 32:55
// https://www.youtube.com/watch?v=sJ6pMLp_IaI

export let angle = 60

s.size(400, 400)

s.background(51)

const poly = new Polygon()
poly.addVertex(100, 100)
poly.addVertex(200, 100)
poly.addVertex(200, 200)
poly.addVertex(100, 200)
poly.close()
poly.hankin()
poly.show()
