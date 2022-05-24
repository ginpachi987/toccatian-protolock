import { dotImage } from "./images"
import { canvas } from "./canvas"

export class Dot {
  constructor(field, x, y) {
    this.x = x || Math.random()
    this.y = y || Math.random()
    this.initX = this.x
    this.initY = this.y

    this.top
    this.left

    this.selected = false

    this.el = document.createElement('div')
    this.el.classList.add('dot')
    let img = new Image()
    img.src = dotImage
    this.el.appendChild(img)
    this.el.addEventListener('click', () => {
      this.selected = !this.selected
      field.checkDots()
      this.el.classList.toggle('highlight')
    })
    field.$dots.appendChild(this.el)
    this.setPos()
  }

  setPos() {
    this.top = Math.floor(this.y * (canvas.width - 28))
    this.left = Math.floor(this.x * (canvas.height - 28))
    this.el.style.top = `${this.top}px`
    this.el.style.left = `${this.left}px`
  }

  reset() {
    this.x = this.initX
    this.y = this.initY

    this.setPos()
  }

  swap(other) {
    [this.x, this.y, other.x, other.y] = [other.x, other.y, this.x, this.y]
    this.setPos()
    other.setPos()

    this.selected = false
    this.el.classList.toggle('highlight')
    other.selected = false
    other.el.classList.toggle('highlight')
  }

  distance(other) {
    const dist = Math.abs(Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)))

    return dist
  }

  intersection(dot1, dot2, d = 0.03) {
    const dist = Math.abs((dot2.y - dot1.y) * this.x - (dot2.x - dot1.x) * this.y + dot1.y * dot2.x - dot1.x * dot2.y) / Math.sqrt((dot2.y - dot1.y) ** 2 + (dot2.x - dot1.x) ** 2)

    return dist <= d
  }

  delete() {
    this.el.parentNode.removeChild(this.el)
  }
}