import { drawLine } from "./canvas"

export class Line {
  constructor(dot1, dot2) {
    this.dot1 = dot1
    this.dot2 = dot2
    this.intersecting = false
  }

  connected(other) {
    return this.dot1 == other.dot1 || this.dot2 == other.dot2 || this.dot1 == other.dot2 || this.dot2 == this.dot1
  }

  intersection(other) {
    const k1 = (this.dot2.y - this.dot1.y) / (this.dot2.x - this.dot1.x)
    const k2 = (other.dot2.y - other.dot1.y) / (other.dot2.x - other.dot1.x)
    if (k1 == k2) return
    const l1 = this.dot1.y - k1 * this.dot1.x
    const l2 = other.dot1.y - k2 * other.dot1.x
    const x = (l2 - l1) / (k1 - k2)
    const y = k1 * x + l1

    const a1 = Math.min(this.dot1.x, this.dot2.x)
    const b1 = Math.max(this.dot1.x, this.dot2.x)
    const c1 = Math.min(this.dot1.y, this.dot2.y)
    const d1 = Math.max(this.dot1.y, this.dot2.y)
    const a2 = Math.min(other.dot1.x, other.dot2.x)
    const b2 = Math.max(other.dot1.x, other.dot2.x)
    const c2 = Math.min(other.dot1.y, other.dot2.y)
    const d2 = Math.max(other.dot1.y, other.dot2.y)

    if ((x > a1 && x < b1 && y > c1 && y < d1) && (x > a2 && x < b2 && y > c2 && y < d2)) {
      this.intersecting = true
      other.intersecting = true
    }
  }

  draw(left, top) {
    let x1, x2, y1, y2

    x1 = this.dot1.el.getBoundingClientRect().left - left + 14
    y1 = this.dot1.el.getBoundingClientRect().top - top + 14
    x2 = this.dot2.el.getBoundingClientRect().left - left + 14
    y2 = this.dot2.el.getBoundingClientRect().top - top + 14

    drawLine(x1, y1, x2, y2, this.intersecting)
  }
}