import { openSimplexNoise } from './noise'

// TODO: Add an int() method (as seen in Coding Train's Cabana #3)

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

// Assuming that this saves on CPU cycles?
const dateScratch = new Date()

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
    this._drawFn = () => { } // no-op
    this._animationFrameId = null
    this._noLoop = true
    this._pixels = null
    // Mouse Setup --------------------------------------------------------//
    window.addEventListener('mousemove', (event) => {
      this._captureMousePosition()
      if (this._isMousePressed) {
        this._mouseDraggedFn()
      } else {
        // TODO: Call mouseMoved() function, when it is implemented
      }
    })
    window.addEventListener('mousedown', (event) => {
      this._captureMousePosition()
      if (!this._isMousePressed) {
        this._isMousePressed = true
        // Differs from Processing in that the mouse button is given to the fn
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
        this._mousePressedFn(event.button)
      }
    })
    window.addEventListener('mouseup', () => {
      this._captureMousePosition()
      this._isMousePressed = false
      this._mouseReleasedFn()
    })
    this.pmouseX = 1
    this.pmouseY = 1
    this.mouseX = 1
    this.mouseY = 1
    this._mousePressedFn = () => { } // no-op
    this._isMousePressed = false
    this._mouseReleasedFn = () => { } // no-op
    this._mouseDraggedFn = () => { } // no-op
    // Keyboard Setup --------------------------------------------------------//
    // Uses lowercase versions of these strings:
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    this._keys = new Map()
    this._keyPressedFn = () => { } // no-op
    this._keyTypedFn = () => { } // no-op
    window.addEventListener('keydown', (e) => {
      const keyLC = e.key.toLowerCase()
      const alreadyDown = this._keys.get(keyLC)
      if (!alreadyDown) {
        this._keyTypedFn(keyLC) // Differs from Processing - gives lowercased key
      }
      this._keys.set(keyLC, true)
    })
    window.addEventListener('keyup', (e) => {
      const keyLC = e.key.toLowerCase()
      this._keys.set(keyLC, false)
    })
    window.addEventListener('focus', () => {
      for (let i of this._keys.keys()) {
        this._keys.set(i, false)
      }
    })
    // Public Constants ---------------------------------------------------//
    // These are in the same order as the top of this file.
    this.CORNER = CORNER
    this.CENTER = CENTER
    this.RADIUS = RADIUS
    this.CLOSE = CLOSE
    this.TRIANGLES = TRIANGLES
    this.TWO_PI = TWO_PI
    // Math shortcuts -----------------------------------------------------//
    this.sin = Math.sin
    this.cos = Math.cos
    this.atan2 = Math.atan2
    this.floor = Math.floor
    this.PI = Math.PI // see also: TWO_PI
    this.E = Math.E
    this.sqrt = Math.sqrt
    this.pow = Math.pow
    this.exp = Math.exp
    this.abs = Math.abs
    this.min = Math.min
    this.max = Math.max
    // Other Enumerations -------------------------------------------------//
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button#Return_value
    this.MOUSE_BUTTON_MAIN  = 0 // usually left
    this.MOUSE_BUTTON_AUX   = 1 // usually middle / wheel
    this.MOUSE_BUTTON_2ND   = 2 // usually right
    this.MOUSE_BUTTON_BACK  = 3 // usually back button
    this.MOUSE_BUTTON_FWD   = 4 // usually forward button
  }

  get draw() {
    return this._draw
  }

  /**
   * Loop isn't started until draw is set here.
   * Draw only one loop at a time.
   */
  set draw(fn) {
    if (this._animationFrameId !== null) {
      cancelAnimationFrame(this._animationFrameId)
    }
    this._drawFn = fn
    this._noLoop = false // Differs from Processing - reverses a noLoop() if it was called prior to setting draw (call noLoop() in draw() instead)
    const loop = (time) => {
      this._animationFrameId = requestAnimationFrame(loop)
      this._keyPressedFn(this._keys) // Not really drawing but needs to be here...
      if (!this._noLoop) {
        this._drawSingleFrame(time) // Differs from Processing - gives time argument
      }
    }
    loop()
  }

  noLoop() {
    this._noLoop = true
  }

  redraw() {
    this._drawSingleFrame() // does not give a time argument
  }

  _drawSingleFrame(time) {
    this.ctx.save()
    this._drawFn(time)
    this._frameCount++
    this.ctx.restore() // In case there were any transformations.
  }

  get mousePressed() {
    return this._isMousePressed // return a boolean, but...
  }

  set mousePressed(fn) {
    this._mousePressedFn = fn // ...accepts a function here
  }

  set mouseReleased(fn) {
    this._mouseReleasedFn = fn
  }

  set mouseDragged(fn) {
    this._mouseDraggedFn = fn
  }

  get keyPressed() {
    return this._isKeyPressed // returns boolean here, but...
  }

  set keyPressed(fn) { // ...accepts a function here
    this._keyPressedFn = fn
  }

  set keyTyped(fn) {
    this._keyTypedFn = fn
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
    this.background(192) // Like Processing's default.
    //
    for (let prop in state) {
      this.ctx[prop] = state[prop]
    }
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath()
    // Add subpixel for clearer lines...
    // https://stackoverflow.com/a/13884434
    // https://stackoverflow.com/a/7531540
    this.ctx.scale(1, 1)
    this.ctx.moveTo(x1 + 0.5, y1 + 0.5)
    this.ctx.lineTo(x2 + 0.5, y2 + 0.5)
    if (this._strokeOn) {
      this.ctx.stroke()
    }
  }

  rectMode(mode) {
    if (_VALID_RECT_MODES.includes(mode)) {
      this._currentRectMode = mode
    } else {
      throw new Error(`Invalid mode: ${mode}`)
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
    // Use of + 0.5 to add subpixel, removes line blur?
    // https://stackoverflow.com/a/13884434
    // https://stackoverflow.com/a/7531540
    if (this._fillOn) {
      if (this._strokeOn) {
        this.ctx.fillRect(left + 0.5, top + 0.5, width, height)
      } else {
        // Without stroke, line things up without subpixel to prevent cracks...
        // (Just guessing... might need to fix all this)
        this.ctx.fillRect(left, top, width, height)
      }
    }
    if (this._strokeOn) {
      this.ctx.strokeRect(left + 0.5, top + 0.5, width, height)
    }
  }

  ellipseMode(mode) {
    if (_VALID_ELLIPSE_MODES.includes(mode)) {
      this._currentEllipseMode = mode
    } else {
      throw new Error(`Invalid mode: ${mode}`)
    }
  }

  ellipse(px, py, pw, ph=pw) {
    this.arc(px, py, pw, ph, 0, TWO_PI)
  }

  // Differs from Processing: OPEN fill type only,
  // no optional seventh parameter (no PIE or CHORD).
  arc(px, py, pw, ph, start, stop) {
    if (pw < 0) pw *= -1 // a p5 thing... Processing just acts like it is 0
    if (ph < 0) ph *= -1 // a p5 thing... Processing just acts like it is 0
    let x, y, rw, rh
    if (this._currentEllipseMode === CENTER) {
      x = px
      y = py
      rw = pw / 2
      rh = ph / 2
    } else if (this._currentEllipseMode === RADIUS) {
      x = px
      y = py
      rw = pw
      rh = ph
    }
    this.ctx.beginPath()
    this.ctx.ellipse(x, y, rw, rh, 0, start, stop)
    if (this._fillOn) {
      this.ctx.fill()
    }
    if (this._strokeOn) {
      this.ctx.stroke()
    }
  }

  point(px, py) {
    // Differs from Processing in that rect is used instead of ellipse,
    // to help with performance.
    //
    // Processing uses stroke color instead of fill.
    const tmp = this.ctx.fillStyle
    this.ctx.fillStyle = this.ctx.strokeStyle
    const w = this.ctx.lineWidth
    const x = px - Math.floor(w / 2)
    const y = py - Math.floor(w / 2)
    this.ctx.fillRect(x, y, w, w)
    // Commented out round points:
    // this.ctx.beginPath()
    // this.ctx.ellipse(x, y, w, w, 0, 0, TWO_PI)
    // this.ctx.fill()
    this.ctx.fillStyle = tmp
  }

  background(...args) {
    // TODO: Fix this so it works after translate()
    this.ctx.save()
    const fillOnPrev = this._fillOn // Assumes that fill() sets only this in addition to the style
    this.fill(...args)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this._fillOn = fillOnPrev
    this.ctx.restore()
  }

  color(a, b, c, d=255) {
    // Differs from Processing in that this returns a string,
    // whereas Processing returns a color object that can be used
    // to also set pixels.
    a = Math.floor(a)
    b = Math.floor(b)
    c = Math.floor(c)
    d = Math.floor(d)
    if (present(d)) {
      return `#${hexFrom256(a)}${hexFrom256(b)}${hexFrom256(c)}${hexFrom256(d)}`
    } else {
      return `#${hexFrom256(a)}${hexFrom256(b)}${hexFrom256(c)}`
    }
  }

  /**
   * From:
   * https://stackoverflow.com/a/17243070
   *
   * h - hue range is [0, 360]
   * s - saturation is [0, 1]
   * v - value is [0, 1]
   *
   * r, g, b returned are integers between 0 to 255 inclusive.
   *
   * This is not a standard Processing function.
   * Replaces the Processing function colorMode().
   * Might consider adapting color() to do this.
   *
   * Uses a ref to be faster. Ref should be an
   * array of length 3.
   */
  HSVtoRGB(h, s, v, ref) {
    h = this.constrain(h, 0, 360) / 360
    s = this.constrain(s, 0, 1)
    v = this.constrain(v, 0, 1)
    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)
    let r, g, b
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break
        case 1: r = q, g = v, b = p; break
        case 2: r = p, g = v, b = t; break
        case 3: r = p, g = q, b = v; break
        case 4: r = t, g = p, b = v; break
        case 5: r = v, g = p, b = q; break
    }
    ref[0] = Math.round(r * 255)
    ref[1] = Math.round(g * 255)
    ref[2] = Math.round(b * 255)
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

  // TODO: randomSeed()
  // http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html

  /**
   * random([])        <-- from p5.js, not Processing
   * random(max)
   * random(min, max)
   */
  random(a, b) {
    if (typeof a == 'object') {
      if (a.length === 0) {
        return null
      } else {
        return a[Math.floor(this.random(0, a.length))]
      }
    } else {
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
  }

  randomGaussian() {
    // from: https://stackoverflow.com/a/36481059
    let u = 0, v = 0
    while (u === 0) u = Math.random() // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
  }

  delay() {
    throw new Error('"Never use delay!" Use draw\'s time argument instead.')
  }

  // Shape Machine (BEGIN) ------------------------------------------------//
  beginShape(mode=DEFAULT) {
    if (_VALID_SHAPE_MODES.includes(mode)) {
      this.ctx.beginPath()
      this._shapeStarting = true
      this._currentShapeMode = mode
      this._currentShapeVertexCount = 0
    } else {
      throw new Error(`Invalid mode: ${mode}`)
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

  /**
   * Differs from p5.js: when a = 0, the value is not random.
   * In fact, it seems like it is always 0.5.
   */
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

  noiseSeed(clientSeed) {
    this._osnApi = openSimplexNoise(clientSeed)
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

  resetMatrix() {
    this.ctx.resetTransform()
  }

  _captureMousePosition() {
    this.pmouseX = this.mouseX
    this.pmouseY = this.mouseY
    const rect = this.canvas.getBoundingClientRect()
    this.mouseX = event.clientX - rect.left
    this.mouseY = event.clientY - rect.top
  }

  radians(degrees) {
    // Different from Processing in that this is used
    // instead of angleMode()
    return degrees * (Math.PI / 180)
  }

  scale(a, b) {
    if (present(b)) {
      this.ctx.scale(a, b)
    } else {
      this.ctx.scale(a, a)
    }
  }

  loadPixels() {
    // Differs from Processing in that they are just plain Canvas operations.
    this._capturedImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    this._pixels = this._capturedImageData.data
  }

  get pixels() {
    // Differs from Processing in that they are just plain Canvas operations.
    // Must to multiply by 4 to get correct index.
    return this._pixels
  }

  updatePixels() {
    // Differs from Processing in that they are just plain Canvas operations.
    this.ctx.putImageData(this._capturedImageData, 0, 0)
  }

  /**
   * Warning: if specifying a value, decimals are truncated, so you
   * may have to accept integers and then map() them afterwards.
   */
  createSlider(min, max, value=min, step=1) {
    const element = document.createElement('input')
    this.canvas.parentElement.appendChild(element)
    element.type = 'range'
    element.min = min
    element.max = max
    element.value = value // Browsers truncates decimals!
    element.step = step
    return {
      value(value) {
        if (value != undefined) {
          element.value = value
        }
        return parseFloat(element.value)
      },
      style(name, value) {
        element.style[name] = value
        return this
      }
    }
  }

  createP(initial) {
    const element = document.createElement('p')
    this.canvas.parentElement.appendChild(element)
    element.textContent = initial || ''
    return {
      value(value) {
        if (value != undefined) {
          element.textContent = value
        }
        return element.textContent
      },
      style(name, value) {
        element.style[name] = value
        return this
      }
    }
  }

  createButton(caption) {
    const element = document.createElement('button')
    this.canvas.parentElement.appendChild(element)
    element.textContent = caption
    return {
      mousePressed(fn) {
        element.addEventListener('click', () => {
          fn()
        })
      }
    }
  }

  // colorMode(mode) {
  //   // Differs from Processing in that no max values are given as arguments.
  //   if (_VALID_COLOR_MODES.includes(mode)) {
  //     this._colorMode = mode
  //     // TODO: Also, elsewhere update HSV and RGB checks
  //   } else {
  //     throw new Error(new Error(`Invalid mode: ${mode}`))
  //   }
  // }

  /**
   * current is a value between 0.0 and 1.0
   */
  lerp(start, end, current) {
    return start + (end - start) * current
  }

  textSize(n) {
    this.ctx.font = `${n}px sans-serif`
  }

  text(str, x, y) {
    this.ctx.fillText(str, x, y)
  }

  triangle(x1, y1, x2, y2, x3, y3) {
    this.beginShape()
    this.vertex(x1, y1)
    this.vertex(x2, y2)
    this.vertex(x3, y3)
    this.endShape(CLOSE)
  }

  day() {
    dateScratch.setTime(Date.now())
    return dateScratch.getDate()
  }

  hour() {
    dateScratch.setTime(Date.now())
    return dateScratch.getHours()
  }

  minute() {
    dateScratch.setTime(Date.now())
    return dateScratch.getMinutes()
  }

  millis() {
    dateScratch.setTime(Date.now())
    return dateScratch.getMilliseconds()
  }

  second() {
    dateScratch.setTime(Date.now())
    return dateScratch.getSeconds()
  }

  month() {
    dateScratch.setTime(Date.now())
    // JS 0 to 11 => Processing 1 to 12
    return dateScratch.getMonth() + 1
  }

  year() {
    dateScratch.setTime(Date.now())
    return dateScratch.getFullYear()
  }

  sortNumbers(arr) {
    // Differs from Processing: This exists because JS's
    // array sort() function uses "alphabetical" order,
    // so this one is for numbers.
    return arr.sort((a, b) => a > b)
  }
}

// TODO: Use this somewhere? Might need adjustments to mouse position?
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'

export default Sketch = Sketch
