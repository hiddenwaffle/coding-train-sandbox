
// TODO: Use this somewhere?
// canvas.style.transformOrigin = '0 0'
// canvas.style.transform = 'scale(2)'

export default class {
  constructor(parent) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { alpha: false })
    if (parent) {
      parent.appendChild(this.canvas)
    } else {
      document.body.appendChild(this.canvas)
    }
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

  rect(x, y, width, height) {
    this.ctx.fillRect(x, y, width, height)
    this.ctx.strokeRect(x, y, width, height)
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

  background(...args) {
    this.ctx.save()
    this.fill(...args)
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.restore()
  }
}
