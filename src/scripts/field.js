import { Dot } from "./dot"
import { Line } from "./line"

export class Field {
  constructor(container) {
    this.container = container
    this.dots = []
    this.lines = []
    this.figures = []
    this.active = false
    this.$dots = document.querySelector('.dots')
    this.draw = false
  }

  newField() {
    const figureCount = 3//Math.round(Math.random()) + 3

    let figureDots = []
    let dotsCount = 0

    for (let i = 0; i < figureCount; i++) {
      const count = Math.round(Math.random() * 2) + 3
      figureDots.push(count)
      dotsCount += count
    }
    console.log(dotsCount)

    this.dots.forEach(dot => {
      dot.delete()
    })
    this.dots = []

    while (this.dots.length < dotsCount) {
      let newDot = new Dot(this)
      let passed = true
      for (let i = 0; i < this.dots.length; i++) {
        if (newDot.distance(this.dots[i]) < 0.1) {
          passed = false
          break
        }
        if (this.dots.length > 2) {
          for (let j = i + 1; j < this.dots.length; j++) {
            if (newDot.intersection(this.dots[i], this.dots[j])) {
              passed = false
              break
            }
          }
          if (!passed) break
        }
      }
      if (passed) this.dots.push(newDot)
      else newDot.delete()
    }

    let dots = [...this.dots]

    this.figures = []
    for (let i = 0; i < figureCount; i++) {
      this.figures[i] = []
      for (let j = 0; j < figureDots[i]; j++) {
        this.figures[i].push(dots.splice(Math.floor(Math.random() * dots.length), 1)[0])
      }
    }

    this.recalcLines()
  }

  recalcLines() {
    this.lines = []

    for (let i = 0; i < this.figures.length; i++) {
      this.lines.push(new Line(this.figures[i][0], this.figures[i][this.figures[i].length - 1]))

      for (let j = 0; j < this.figures[i].length - 1; j++) {
        this.lines.push(new Line(this.figures[i][j], this.figures[i][j + 1]))
      }
    }

    for (let i = 0; i < this.lines.length - 1; i++) {
      for (let j = i + 1; j < this.lines.length; j++) {
        if (this.lines[i].connected(this.lines[j])) continue

        this.lines[i].intersection(this.lines[j])
      }
    }

    if (!this.active) return

    if (this.lines.filter(a => a.intersecting).length == 0) {
      this.newGame()
    }
  }

  flicker(opacity = 1) {
    this.dots.forEach((dot, i) => {
      setTimeout(() => {
        dot.el.style.opacity = opacity
      }, i * 100)
    })
  }

  newGame() {
    this.active = false
    this.container.style.pointerEvents = 'none'
    this.draw = false
    this.flicker(0)

    setTimeout(() => {
      this.newField()
      this.active = true
      this.container.style.pointerEvents = 'auto'
      this.flicker()

      setTimeout(() => {
        this.draw = true
      }, this.dots.length * 150)
    }, this.dots.length * 200)

    
  }

  resize(size) {
    this.container.style.width = `${size}px`
    this.container.style.height = `${size}px`
    this.$dots.style.width = `${size}px`
    this.$dots.style.height = `${size}px`
    this.dots.forEach(dot => {
      dot.setPos()
    })
  }

  reset() {
    this.dots.forEach(dot => {
      dot.reset()
    })
    this.recalcLines()
  }

  checkDots() {
    const selected = this.dots.filter(dot => dot.selected)
    if (selected.length !== 2) return
    this.active = false

    selected[0].swap(selected[1])

    setTimeout(() => {
      this.active = true
    }, 1000)
  }

  drawLines() {
    if (!this.draw) return
    const left = this.$dots.getBoundingClientRect().left
    const top = this.$dots.getBoundingClientRect().top

    this.recalcLines()
    this.lines.forEach(line => line.draw(left, top))
  }
}