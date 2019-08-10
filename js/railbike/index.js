const CORNER = 'CORNER'
const CENTER = 'CENTER'
const VALID_RECT_MODES = [CORNER, CENTER]

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
    // Mouse Setup --------------------------------------------------------//
    this.canvas.addEventListener('mousemove', (event) => {
      this.pmouseX = this.mouseX
      this.pmouseY = this.mouseY
      const rect = this.canvas.getBoundingClientRect()
      this.mouseX = event.clientX - rect.left
      this.mouseY = event.clientY - rect.top
    })
    this.canvas.addEventListener('mousedown', () => {
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
    this.CORNER = CORNER
    this.CENTER = CENTER
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
    this.ctx[style] = `rgb(${a},${a},${a},${b})`
  }

  _setStyle3(style, a, b, c) {
    this.ctx[style] = `rgb(${a},${b},${c})`
  }

  _setStyle4(style, a, b, c, d) {
    const alpha = (d / 255).toFixed(3)
    this.ctx[style] = `rgba(${a},${b},${c},${alpha})`
  }
}

// TODO: Use this somewhere? Would need adjustments to mouse position.
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'
