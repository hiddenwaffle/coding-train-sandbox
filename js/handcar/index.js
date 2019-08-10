const CORNER = 'CORNER'
const CENTER = 'CENTER'
const VALID_RECT_MODES = [CORNER, CENTER]

const CLOSE = 'CLOSE'

const PI = Math.PI
const TWO_PI = Math.PI * 2

export class Sketch {
  constructor(parent) {
    // Canvas and Context Setup -------------------------------------------//
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { alpha: false })
    if (parent) {
      parent.appendChild(this.canvas)
    } else {
      document.body.appendChild(this.canvas)
    }
    // Simple Defaults ----------------------------------------------------//
    this.currentRectMode = CORNER
    this.animationFrameId = null
    this.print = console.log // for completion's sake
    // Mouse Setup --------------------------------------------------------//
    window.addEventListener('mousemove', (event) => {
      this.pmouseX = this.mouseX
      this.pmouseY = this.mouseY
      const rect = this.canvas.getBoundingClientRect()
      this.mouseX = event.clientX - rect.left
      this.mouseY = event.clientY - rect.top
    })
    window.addEventListener('mousedown', () => {
      if (!this._isMousePressed) {
        this._isMousePressed = true
        this._mousePressed()
      }
    })
    window.addEventListener('mouseup', () => {
      this._isMousePressed = false
    })
    this.pmouseX = 1
    this.pmouseY = 1
    this.mouseX = 1
    this.mouseY = 1
    this._mousePressed = () => { } // no-op
    this._isMousePressed = false
    // Keyboard Setup --------------------------------------------------------//
    window.addEventListener('keydown', () => {
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
    // Public Constants ---------------------------------------------------//
    // These are in the same order as the top of this file.
    this.CORNER = CORNER
    this.CENTER = CENTER
    this.CLOSE = CLOSE
    this.PI = PI
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
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
    }
    const loop = () => {
      f()
      this.animationFrameId = requestAnimationFrame(loop)
    }
    loop()
  }

  get mousePressed() {
    return this._isMousePressed // return a boolean... trickery here
  }

  set mousePressed(f) {
    this._mousePressed = f // accepts a function... trickery here
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

  /**
   * Colors are set like Processing defaults.
   */
  size(width, height) {
    this.canvas.width = width
    this.canvas.height = height
    this.background(192, 192, 192)
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  rectMode(mode) {
    if (VALID_RECT_MODES.includes(mode)) {
      this.currentRectMode = mode
    } else {
      throw new Error(`Invalid mode: ${mode}`)
    }
  }

  rect(x, y, width, height) {
    let top, left
    if (this.currentRectMode === CORNER) {
      top = y
      left = x
    } else if (this.currentRectMode === CENTER) {
      top = Math.floor(y - (height / 2))
      left = Math.floor(x - (width / 2))
    }
    this.ctx.fillRect(left, top, width, height)
    this.ctx.strokeRect(left, top, width, height)
  }

  ellipse(x, y, radiusW, radiusH) {
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, radiusW / 2, radiusH / 2, 0, 0, TWO_PI)
    this.ctx.fill()
    this.ctx.stroke()
  }

  background(...args) {
    this.ctx.save()
    this.fill(...args)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
  }

  stroke(...args) {
    this[`_setStyle${arguments.length}`]('strokeStyle', ...args)
  }

  fill(...args) {
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

  strokeWeight(n) {
    this.ctx.lineWidth = n
  }

  random(min, max) {
    return (Math.random() * ((max || 0) - min)) + min
  }

  delay() {
    throw new Error('Never use delay!')
  }

  // Shape Machine (BEGIN) ------------------------------------------------//
  beginShape() {
    this.ctx.beginPath()
    this._shapeStarting = true
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
  }
  endShape(mode) {
    if (mode === CLOSE) {
      this.ctx.closePath()
    }
    this.ctx.fill()
    this.ctx.stroke()
  }
  // Shape Machine (END) --------------------------------------------------//

  dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) +
                     Math.pow(y2 - y1, 2))
  }
}

// TODO: Use this somewhere? Might need adjustments to mouse position?
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'
