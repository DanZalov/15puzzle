import image from './victory.jpg'

export function numberItemDiv(number) {
  return `<div class="number-item unselectable" id="${number}"></div>`
}

export function rowDiv(number) {
  let text = ''
  text += `<div class="row">`
  for (let j = 0; j < 4; j++) {
    text += numberItemDiv(number * 4 + j + 1)
  }
  text += `</div>`
  return text
}

export function victoryPictureAdd() {
  const img = document.createElement('img')
  img.src = image
  img.classList = ['img']
  document.querySelector(
    '.play-table'
  ).outerHTML = `<div class=\"play-table background-white\">Victory!</div>`
  document.querySelector('.play-table').appendChild(img)
}

export function playTableDiv() {
  const $playTable = document.querySelector('.play-table')
  let playTableText = ''
  for (let i = 0; i < 4; i++) {
    playTableText += rowDiv(i)
  }

  $playTable.insertAdjacentHTML('beforeend', playTableText)
}

export function classInit() {
  document.getElementById(16).classList.add('blank')
  document.getElementById(12).classList.add('active')
  document.getElementById(15).classList.add('active')
}
