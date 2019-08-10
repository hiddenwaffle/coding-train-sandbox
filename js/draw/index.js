function present(x) {
  return x !== undefined &&
         x !== null
}

function presentAll(...args) {
  return args.every(present)
}

// TODO: Use this somewhere?
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'

export default class {
  constructor(existingCanvas) {
    this.canvas = existingCanvas || document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { alpha: false })
    this.canvas.id = 'canvas'
    document.body.appendChild(this.canvas)
  }

  /**
   * Colors are set like Processing defaults.
   */
  size(width, height) {
    this.canvas.width = width
    this.canvas.height = height
    this.ctx.fillStyle = 'rgb(192, 192, 192)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = 'rgb(255, 255, 255)'
  }

  line(x1, y1, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
  }

  rect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
    this.ctx.strokeRect(x, y, width, height)
  }

  stroke(...args) {
    this._setStyle('strokeStyle', ...args)
  }

  fill(...args) {
    this._setStyle('fillStyle', ...args)
  }

  _setStyle(style, a, b, c) {
    let success = true
    if (presentAll(a, b, c)) {
      this.ctx[style] = `rgba(${a},${b},${c})`
    } else if (presentAll(a)) {
      if (typeof a === 'number') {
        this.ctx[style] = `rgba(${a},${a},${a})`
      } else if (typeof a === 'string') {
        this.ctx[style] = a // maybe given hex, like #ff00ff
      } else {
        success = false
      }
    } else {
      success = false
    }
    if (!success) {
      throw new Error('Not yet implemented')
    }
  }
}
