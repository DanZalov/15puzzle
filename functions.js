import { victoryPictureAdd } from './pagecontent'

export function randomInit() {
  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  numbersArray.sort(() => Math.random() - 0.5)

  for (let i = 1; i < numbersArray.length + 1; i++) {
    document.getElementById(i).textContent = numbersArray[i - 1]
  }
}

export function getNeighborIndex(blankNumber) {
  const indexArray = []
  if (blankNumber - 4 > 0) {
    indexArray.push(blankNumber - 4)
  }
  if ((blankNumber - 1) % 4 !== 0) {
    indexArray.push(blankNumber - 1)
  }
  if ((blankNumber + 1) % 4 !== 1) {
    indexArray.push(blankNumber + 1)
  }
  if (blankNumber + 4 < 17) {
    indexArray.push(blankNumber + 4)
  }
  return indexArray
}

export function checkVictory() {
  for (let i = 1; i < 16; i++) {
    if (document.getElementById(i).textContent != i) {
      return
    }
  }
  victoryPictureAdd()
}

export function rotateDesk() {
  let blankIndex
  const indexArray = []
  for (let i = 4; i > 0; i--) {
    for (let j = 0; j < 4; j++) {
      let text = document.getElementById(i + j * 4).textContent
      indexArray.push(text)
    }
  }
  for (let i = 1; i < 17; i++) {
    document.getElementById(i).textContent = indexArray[i - 1]
    if (indexArray[i - 1] === '') {
      blankIndex = i
      document.getElementById(i).classList.add('blank')
    } else {
      document.getElementById(i).classList.remove('blank')
    }
  }
  return blankIndex
}

export function checkVictoryPossibility() {
  let counter
  const indexArray = []
  for (let i = 1; i < 17; i++) {
    let text = document.getElementById(i).textContent
    indexArray.push(+text)
    if (text === '') {
      counter = Math.trunc((i - 0.5) / 4)
      indexArray.pop()
    }
  }
  for (let i = 0; i < 14; i++) {
    for (let j = i + 1; j < 15; j++) {
      if (indexArray[i] > indexArray[j]) {
        counter++
      }
    }
  }
  if (counter % 2 !== 1) {
    swap()
  }
  // counter%2 === 1
  //   ? console.log(true)
  //   : console.log(false)
}

export function swap() {
  const $id14 = document.getElementById(14)
  const $id15 = document.getElementById(15)
  if (
    !$id14.classList.contains('blank') &&
    !$id15.classList.contains('blank')
  ) {
    const temp = $id14.textContent
    $id14.textContent = $id15.textContent
    $id15.textContent = temp
  }
}
