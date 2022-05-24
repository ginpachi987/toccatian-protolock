import dotImage from '../img/dot.png'
import border1 from '../img/border1.png'
import border2 from '../img/border2.png'
import border3 from '../img/border3.png'
import border4 from '../img/border4.svg'
import tip from '../img/tip.png'
import tooltip from '../img/tooltip.png'

export function preload(callback) {
  return new Promise(resolve => {
    const images = [dotImage, border1, border2, border3, border4, tip, tooltip]
    let loaded = 0
    images.forEach(img => {
      const obj = new Image()
      obj.src = img
      obj.onload = () => {
        loaded++
        if (loaded === images.length) {
          const loading = document.querySelector('#loading')
          loading.parentNode.removeChild(loading)

          callback()
          resolve()
        }
      }
    })
  })
}

export { dotImage, border1, border2, border3, border4, tip, tooltip }