import { openSimplexNoise } from './noise'

const CORNER = 'CORNER'
const CENTER = 'CENTER'
const _VALID_RECT_MODES = [CORNER, CENTER]
const RADIUS = 'RADIUS'
const _VALID_ELLIPSE_MODES = [CENTER, RADIUS]

const CLOSE = 'CLOSE'

const DEFAULT = 'DEFAULT'
const TRIANGLES = 'TRIANGLES'
const _VALID_SHAPE_MODES = [DEFAULT, TRIANGLES]

const TWO_PI = Math.PI * 2

function present(x) {
  return x !== undefined && x !== null
}

function hexFrom256(n) {
  return (n % 256).toString(16).padStart(2, '0')
}

class Sketch {
  constructor(parent) {
    // Canvas and Context Setup -------------------------------------------//
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { alpha: false })
    if (parent) {
      parent.appendChild(this.canvas)
    } else {
      document.body.appendChild(this.canvas)
    }
    // Internal Defaults --------------------------------------------------//
    this._osnApi = openSimplexNoise(Date.now())
    this._frameCount = 0
    this.stroke(0)
    this.fill(255)
    this._currentRectMode = CORNER
    this._currentEllipseMode = CENTER
    this._currentShapeMode = DEFAULT
    this._currentShapeVertexCount = 0
    this._animationFrameId = null
    // Mouse Setup --------------------------------------------------------//
    window.addEventListener('mousemove', (event) => {
      this._captureMousePosition()
    })
    window.addEventListener('mousedown', () => {
      this._captureMousePosition()
      if (!this._isMousePressed) {
        this._isMousePressed = true
        this._mousePressed()
      }
    })
    window.addEventListener('mouseup', () => {
      this._captureMousePosition()
      this._isMousePressed = false
      this._mouseReleased()
    })
    this.pmouseX = 1
    this.pmouseY = 1
    this.mouseX = 1
    this.mouseY = 1
    this._mousePressed = () => { } // no-op
    this._isMousePressed = false
    this._mouseReleased = () => { } // no-op
    // Keyboard Setup --------------------------------------------------------//
    window.addEventListener('keydown', (e) => {
      this.key = String.fromCharCode(e.keyCode)
      if (!this._isKeyPressed) {
        this._isKeyPressed = true
        this._keyPressed()
      }
    })
    window.addEventListener('keyup', () => {
      this._isKeyPressed = false
    })
    this._keyPressed = () => { } // no-op
    this._isKeyPressed = false
    this.key = ''
    // Public Constants ---------------------------------------------------//
    // These are in the same order as the top of this file.
    this.CORNER = CORNER
    this.CENTER = CENTER
    this.RADIUS = RADIUS
    this.CLOSE = CLOSE
    this.TRIANGLES = TRIANGLES
    this.TWO_PI = TWO_PI
  }

  get draw() {
    return this._draw
  }

  /**
   * Loop isn't started until draw is set here.
   * Only one draw loop at a time.
   */
  set draw(f) {
    if (this._animationFrameId !== null) {
      cancelAnimationFrame(this._animationFrameId)
    }
    const loop = () => {
      this.ctx.save()
      f()
      this._frameCount++
      this.ctx.restore() // In case there were any transformations.
      this._animationFrameId = requestAnimationFrame(loop)
    }
    loop()
  }

  get mousePressed() {
    return this._isMousePressed // return a boolean... trickery here
  }

  set mousePressed(f) {
    this._mousePressed = f // accepts a function... trickery here
  }

  set mouseReleased(f) {
    this._mouseReleased = f
  }

  get keyPressed() {
    return this._isKeyPressed // return a boolean... trickery here
  }

  set keyPressed(f) {
    this._keyPressed = f // accepts a function... trickery here
  }

  get width() {
    return this.canvas.width
  }

  get height() {
    return this.canvas.height
  }

  get frameCount() {
    return this._frameCount
  }

  /**
   * Note that changing the width and height causes
   * its state to be reset, so it is saved.
   * https://stackoverflow.com/a/55343476
   */
  size(width, height) {
    const props = ['strokeStyle', 'fillStyle', 'globalAlpha', 'lineWidth',
    'lineCap', 'lineJoin', 'miterLimit', 'lineDashOffset', 'shadowOffsetX',
    'shadowOffsetY', 'shadowBlur', 'shadowColor', 'globalCompositeOperation',
    'font', 'textAlign', 'textBaseline', 'direction', 'imageSmoothingEnabled']
    const state = { }
    for (let prop of props) {
      state[prop] = this.ctx[prop]
    }
    //
    this.canvas.width = width
    this.canvas.height = height
    this.background(192, 192, 192) // Like Processing's default.
    //
    for (let prop in state) {
      this.ctx[prop] = state[prop]
    }
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    if (this._strokeOn) {
      this.ctx.stroke()
    }
  }

  rectMode(mode) {
    if (_VALID_RECT_MODES.includes(mode)) {
      this._currentRectMode = mode
    } else {
      throw new Error(new Error(`Invalid mode: ${mode}`))
    }
  }

  rect(x, y, width, height) {
    let top, left
    if (this._currentRectMode === CORNER) {
      top = y
      left = x
    } else if (this._currentRectMode === CENTER) {
      top = Math.floor(y - (height / 2))
      left = Math.floor(x - (width / 2))
    }
    if (this._fillOn) {
      this.ctx.fillRect(left, top, width, height)
    }
    if (this._strokeOn) {
      this.ctx.strokeRect(left, top, width, height)
    }
  }

  ellipseMode(mode) {
    if (_VALID_ELLIPSE_MODES.includes(mode)) {
      this._currentEllipseMode = mode
    } else {
      throw new Error(new Error(`Invalid mode: ${mode}`))
    }
  }

  ellipse(px, py, prw, prh) {
    let x, y, rw, rh
    if (this._currentEllipseMode === CENTER) {
      x = px
      y = py
      rw = prw / 2
      rh = prh / 2
    } else if (this._currentEllipseMode === RADIUS) {
      x = px
      y = py
      rw = prw
      rh = prh
    }
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, rw, rh, 0, 0, TWO_PI)
    if (this._fillOn) {
      this.ctx.fill()
    }
    if (this._strokeOn) {
      this.ctx.stroke()
    }
  }

  point(x, y) {
    // Processing uses stroke color instead of fill
    const tmp = this.ctx.fillStyle
    this.ctx.fillStyle = this.ctx.strokeStyle
    this.ctx.fillRect(x, y, 1, 1)
    this.ctx.fillStyle = tmp
  }

  background(...args) {
    this.ctx.save()
    this.fill(...args)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
  }

  color(a, b, c) {
    // TODO: Handle HSB
    return `#${hexFrom256(a)}${hexFrom256(b)}${hexFrom256(c)}`
  }

  stroke(...args) {
    this._strokeOn = true
    this[`_setStyle${arguments.length}`]('strokeStyle', ...args)
  }

  fill(...args) {
    this._fillOn = true
    this[`_setStyle${arguments.length}`]('fillStyle', ...args)
  }

  _setStyle1(style, a) {
    if (typeof a === 'number') {
      this.ctx[style] = `rgb(${a},${a},${a})`
    } else if (typeof a === 'string') {
      this.ctx[style] = a // perhaps hex, like #ff00ff
    }
  }

  _setStyle2(style, a, b) {
    const alpha = (b / 255).toFixed(3)
    this.ctx[style] = `rgba(${a},${a},${a},${alpha})`
  }

  _setStyle3(style, a, b, c) {
    this.ctx[style] = `rgb(${a},${b},${c})`
  }

  _setStyle4(style, a, b, c, d) {
    const alpha = (d / 255).toFixed(3)
    this.ctx[style] = `rgba(${a},${b},${c},${alpha})`
  }

  noStroke() {
    this._strokeOn = false
  }

  strokeWeight(n) {
    this.ctx.lineWidth = n
  }

  noFill() {
    this._fillOn = false
  }

  random(a, b) {
    let min, max
    if (present(b)) {
      min = a
      max = b
    } else {
      min = 0
      max = a
    }
    return Math.random() * (max - min) + min
  }

  randomGaussian() {
    // from: https://stackoverflow.com/a/36481059
    let u = 0, v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  }

  delay() {
    throw new Error('"Never use delay!" per Processing tutorial')
  }

  // Shape Machine (BEGIN) ------------------------------------------------//
  beginShape(mode=DEFAULT) {
    if (_VALID_SHAPE_MODES.includes(mode)) {
      this.ctx.beginPath()
      this._shapeStarting = true
      this._currentShapeMode = mode
      this._currentShapeVertexCount = 0
    } else {
      throw new Error(new Error(`Invalid mode: ${mode}`))
    }
  }

  vertex(x, y) {
    if (this._shapeStarting) {
      this._yStartShape = x
      this._xStartShape = y
      this._shapeStarting = false
      this.ctx.moveTo(x, y)
    } else {
      this.ctx.lineTo(x, y)
    }
    this._currentShapeVertexCount++
    if (this._currentShapeMode === TRIANGLES &&
        this._currentShapeVertexCount === 3) {
      this.endShape(CLOSE)
    }
  }

  endShape(mode) {
    if (mode === CLOSE) {
      this.ctx.closePath()
    }
    if (this._fillOn) {
      this.ctx.fill()
    }
    if (this._strokeOn) {
      this.ctx.stroke()
    }
    this._currentShapeMode = 0
  }
  // Shape Machine (END) --------------------------------------------------//

  dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) +
                     Math.pow(y2 - y1, 2))
  }

  constrain(amt, low, high) {
    if (amt < low) {
      return low
    } else if (amt > high) {
      return high
    }
    return amt
  }

  noise(a, b, c, d) {
    let raw
    switch (arguments.length) {
      case 1:
        raw = this._osnApi.noise2D(a, a)
        break
      case 2:
        raw = this._osnApi.noise2D(a, b)
        break
      case 3:
        raw = this._osnApi.noise3D(a, b, c)
        break
      case 4:
        raw = this._osaApi.noise4D(a, b, c, d)
        break
      default:
        throw new Error(`Noise parameters must be between 1 and 4 dimensions`)
    }
    // Center and squish: Processing values are between 0 and 1.
    return (raw + 1) / 2
  }

  map(x, min1, max1, min2, max2) {
    const rangeSize = max1 - min1
    const offset = x - min1
    const pctInRange = offset / rangeSize
    const targetRangeSize = max2 - min2
    const targetOffset = targetRangeSize * pctInRange
    return min2 + targetOffset
  }

  translate(x, y) {
    this.ctx.translate(x, y)
  }

  rotate(a) {
    this.ctx.rotate(a)
  }

  pushMatrix() {
    this.ctx.save()
  }

  popMatrix() {
    this.ctx.restore()
  }

  _captureMousePosition() {
    this.pmouseX = this.mouseX
    this.pmouseY = this.mouseY
    const rect = this.canvas.getBoundingClientRect()
    this.mouseX = event.clientX - rect.left
    this.mouseY = event.clientY - rect.top
  }

  radians(degrees) {
    return degrees * (Math.PI / 180)
  }
}

// TODO: Use this somewhere? Might need adjustments to mouse position?
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'

export default Sketch = Sketch
