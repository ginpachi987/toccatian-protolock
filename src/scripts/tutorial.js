import { langs } from '../lang/langs'

export function showTutorial(showTip, lang) {
  if (!showTip) {
    localStorage.setItem('showTip', true)
    tip.style.opacity = 0
  }

  const wrapper = document.querySelector('#tutorial-wrapper')
  wrapper.style.display = 'block'

  const tutorial = document.createElement('div')
  tutorial.classList.add('tutorial')

  const closeButton = document.createElement('div')
  closeButton.id = 'tutorial-close'
  closeButton.innerHTML = 'X'
  closeButton.addEventListener('click', hideTutorial)

  tutorial.appendChild(closeButton)

  const header = document.createElement('h1')
  header.innerHTML = lang.title || langs.en.title

  tutorial.appendChild(header)
  tutorial.appendChild(document.createElement('hr'))

  let p = document.createElement('p')
  p.innerHTML = lang.tutorial[0] || langs.en.tutorial[0]

  tutorial.appendChild(p)

  wrapper.appendChild(tutorial)
}

function hideTutorial() {
  const wrapper = document.querySelector('#tutorial-wrapper')
  wrapper.innerHTML = ''
  wrapper.style.display = 'none'
}