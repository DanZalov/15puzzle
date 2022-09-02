import {
  checkVictory,
  checkVictoryPossibility,
  getNeighborIndex,
  randomInit,
} from './functions.js'
import { classInit, playTableDiv } from './pagecontent.js'
import './styles/style.css'

export const site = {
  blankIndex: 16,
  render() {
    playTableDiv()
    randomInit()
    checkVictoryPossibility()
    classInit()
    site.newGameButton()
    site.itemSwapHandler(site.blankIndex)
  },

  newGameButton() {
    const $heading = document.querySelector('h2')
    $heading.onclick = () => {
      // checkVictoryPossibility()
      // site.blankIndex = rotateDesk()
      window.location.reload()
    }
  },

  itemSwapHandler(blankIndex) {
    let $allDivs = document.querySelectorAll('.number-item')
    for (let i = 0; i < 16; i++) {
      $allDivs[i].onclick = () => {
        if (getNeighborIndex(blankIndex).includes(+$allDivs[i].id)) {
          document.getElementById(blankIndex).textContent =
            $allDivs[i].textContent
          $allDivs[i].textContent = ''
          document.getElementById(blankIndex).classList.remove('blank')
          blankIndex = +$allDivs[i].id
          document.getElementById(blankIndex).classList.add('blank')
          site.blankIndex = blankIndex
        }
        site.activeClassChangeHandler(blankIndex)
        checkVictory()
      }
    }
  },

  activeClassChangeHandler(blankIndex) {
    let activeIndArray = getNeighborIndex(blankIndex)
    for (let i = 1; i < 17; i++) {
      // $classList = document.getElementById(i).classList
      if (document.getElementById(i).classList.contains('active')) {
        document.getElementById(i).classList.remove('active')
      }
      if (activeIndArray.includes(i)) {
        document.getElementById(i).classList.add('active')
      }
    }
  },
}
