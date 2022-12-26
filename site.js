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
  touchStartX: 0,
  touchStartY: 0,
  touchedDiv: 0,
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
    const $allDivs = document.querySelectorAll('.number-item')
    if (window.screen.availWidth > 768) {
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
    } else {
      for (let i = 0; i < 16; i++) {
        $allDivs[i].addEventListener('touchstart', (event) => {
          this.touchStartX = event.changedTouches[0].screenX
          this.touchStartY = event.changedTouches[0].screenY
          this.touchedDiv = +$allDivs[i].id
        })
      }
      const $playTable = document.querySelector('.play-table')
      $playTable.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].screenX
        const touchEndY = event.changedTouches[0].screenY
        if (
          (touchEndX > this.touchStartX &&
            this.touchedDiv === blankIndex - 1) ||
          (touchEndX < this.touchStartX &&
            this.touchedDiv === blankIndex + 1) ||
          (touchEndY > this.touchStartY &&
            this.touchedDiv === blankIndex - 4) ||
          (touchEndY < this.touchStartY && this.touchedDiv === blankIndex + 4)
        ) {
          document.getElementById(blankIndex).textContent =
            $allDivs[this.touchedDiv - 1].textContent
          $allDivs[this.touchedDiv - 1].textContent = ''
          document.getElementById(blankIndex).classList.remove('blank')
          blankIndex = +$allDivs[this.touchedDiv - 1].id
          document.getElementById(blankIndex).classList.add('blank')
          site.blankIndex = blankIndex
        }
        site.activeClassChangeHandler(blankIndex)
        checkVictory()
      })
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
