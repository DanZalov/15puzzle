import {
  checkVictory,
  checkVictoryPossibility,
  classInit,
  clearStorage,
  // getNeighborIndex,
  getExtendedNeighborIndex,
  getFromStorage,
  randomInit,
  setState,
  stateManager,
  updateStorage,
  // swapWithBlank,
} from './functions.js'
import { playTableDiv } from './pagecontent.js'
import './styles/style.css'

export const site = {
  blankIndex: 16,
  touchStartX: 0,
  touchStartY: 0,
  touchedDiv: 0,
  render() {
    playTableDiv()
    this.blankIndex = stateManager()
    classInit(this.blankIndex)
    site.newGameButton()
    site.itemSwapHandler(site.blankIndex)
    updateStorage()
  },

  newGameButton() {
    const $heading = document.querySelector('h2')
    $heading.onclick = () => {
      // checkVictoryPossibility()
      // site.blankIndex = rotateDesk()
      clearStorage()
      window.location.reload()
    }
  },

  itemSwapHandler(blankIndex) {
    const $allDivs = document.querySelectorAll('.number-item')
    // let clickCount = 0
    if (window.screen.availWidth > 768) {
      for (let i = 0; i < 16; i++) {
        $allDivs[i].onclick = () => {
          // console.log(blankIndex)
          getExtendedNeighborIndex(blankIndex).forEach((dirArr) => {
            if (dirArr.includes(+$allDivs[i].id)) {
              let j = 0
              while (dirArr[j] !== +$allDivs[i].id) {
                this.swapWithBlankNew(dirArr[j])
                blankIndex = dirArr[j]
                j++
              }
              this.swapWithBlankNew(dirArr[j])
              blankIndex = dirArr[j]
              // swapWithBlank(dirArr[j], blankIndex)
              // document.getElementById(blankIndex).textContent =
              //   $allDivs[i].textContent
              // $allDivs[i].textContent = ''
              // document.getElementById(blankIndex).classList.remove('blank')
              // blankIndex = +$allDivs[i].id
              // document.getElementById(blankIndex).classList.add('blank')
              // site.blankIndex = blankIndex
              // site.activeClassChangeHandler(blankIndex)
              // checkVictory()
            }
          })
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
        const indexArray = getExtendedNeighborIndex(blankIndex)
        if (
          (touchEndX > this.touchStartX &&
            indexArray[1].includes(this.touchedDiv)) ||
          (touchEndX < this.touchStartX &&
            indexArray[2].includes(this.touchedDiv)) ||
          (touchEndY > this.touchStartY &&
            indexArray[0].includes(this.touchedDiv)) ||
          (touchEndY < this.touchStartY &&
            indexArray[3].includes(this.touchedDiv))
        ) {
          indexArray.forEach((dirArr) => {
            if (dirArr.includes(this.touchedDiv)) {
              let j = 0
              while (dirArr[j] !== this.touchedDiv) {
                this.swapWithBlankNew(dirArr[j])
                blankIndex = dirArr[j]
                j++
              }
              this.swapWithBlankNew(dirArr[j])
              blankIndex = dirArr[j]
            }
          })
        }
      })
    }
  },

  activeClassChangeHandler(blankIndex) {
    let activeIndArray = getExtendedNeighborIndex(blankIndex)
    for (let i = 1; i < 17; i++) {
      // $classList = document.getElementById(i).classList
      if (document.getElementById(i).classList.contains('active')) {
        document.getElementById(i).classList.remove('active')
      }
      activeIndArray.forEach((dirArr) => {
        if (dirArr.includes(i)) {
          document.getElementById(i).classList.add('active')
        }
      })
    }
  },

  swapWithBlankNew(swapId) {
    let blankIndex = site.blankIndex
    document.getElementById(blankIndex).textContent =
      document.getElementById(swapId).textContent
    document.getElementById(swapId).textContent = ''
    document.getElementById(blankIndex).classList.remove('blank')
    blankIndex = swapId
    document.getElementById(swapId).classList.add('blank')
    site.blankIndex = blankIndex
    site.activeClassChangeHandler(blankIndex)
    updateStorage()
    checkVictory()
  },
}
