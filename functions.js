import { victoryPictureAdd } from './pagecontent'

export function randomInit() {
  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  numbersArray.sort(() => Math.random() - 0.5)

  for (let i = 1; i < numbersArray.length + 1; i++) {
    document.getElementById(i).textContent = numbersArray[i - 1]
  }
}

export function classInit(blankIndex) {
  document.getElementById(blankIndex).classList.add('blank')
  const activeArr = getExtendedNeighborIndex(blankIndex)
  activeArr.forEach((dirArr) => {
    dirArr.forEach((id) => {
      document.getElementById(id).classList.add('active')
    })
  })
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

export function getExtendedNeighborIndex(blankNumber) {
  const indexArray = []
  indexArray.push([])
  if (blankNumber - 4 > 0) {
    let tempUpValue = blankNumber - 4
    while (tempUpValue > 0) {
      indexArray[0].push(tempUpValue)
      tempUpValue -= 4
    }
  }
  indexArray.push([])
  if ((blankNumber - 1) % 4 !== 0) {
    let tempLeftValue = blankNumber - 1
    while (tempLeftValue % 4 !== 0) {
      indexArray[1].push(tempLeftValue)
      tempLeftValue -= 1
    }
  }
  indexArray.push([])
  if ((blankNumber + 1) % 4 !== 1) {
    let tempRightValue = blankNumber + 1
    while (tempRightValue % 4 !== 1) {
      indexArray[2].push(tempRightValue)
      tempRightValue += 1
    }
  }
  indexArray.push([])
  if (blankNumber + 4 < 17) {
    let tempDownValue = blankNumber + 4
    while (tempDownValue < 17) {
      indexArray[3].push(tempDownValue)
      tempDownValue += 4
    }
  }
  // console.dir(indexArray)
  return indexArray
}

export function checkVictory() {
  for (let i = 1; i < 16; i++) {
    if (document.getElementById(i).textContent != i) {
      return
    }
  }
  victoryPictureAdd()
  clearStorage()
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

export function swapWithBlank(swapId, blankIndex) {
  document.getElementById(blankIndex).textContent =
    document.getElementById(swapId).textContent
  document.getElementById(swapId).textContent = ''
  document.getElementById(blankIndex).classList.remove('blank')
  document.getElementById(swapId).classList.add('blank')
}

export function getState() {
  let state = []
  for (let i = 0; i < 16; i++) {
    state.push(document.getElementById(i + 1).textContent)
  }
  return state
}

export function updateStorage() {
  const state = getState()
  localStorage.setItem('state', JSON.stringify(state))
}

export function getFromStorage() {
  return JSON.parse(localStorage.getItem('state'))
}

export function clearStorage() {
  localStorage.removeItem('state')
}

export function setState(state) {
  let blankIndex
  for (let i = 0; i < 16; i++) {
    document.getElementById(i + 1).textContent = state[i]
    if (!state[i]) {
      blankIndex = i + 1
    }
  }
  return blankIndex
}

export function stateManager() {
  let blankIndex
  const state = getFromStorage()
  if (!state) {
    randomInit()
    checkVictoryPossibility()
    blankIndex = 16
  } else {
    blankIndex = setState(state)
  }
  return blankIndex
}
