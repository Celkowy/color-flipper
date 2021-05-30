const switchButton = document.querySelector('button')
const span = document.querySelector('span')
const content = document.querySelector('.content')

let navHandling = {
  colorName: true,
  rgb: false,
  hex: false,
  hsl: false,
}

let switcher = true

const hexTable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

//nav

const navTable = [
  document.querySelector('.colors-name'),
  document.querySelector('.rgb'),
  document.querySelector('.hex'),
  document.querySelector('.hsl'),
]

navTable.forEach(element => {
  element.addEventListener('click', () => {
    if (element.className == 'colors-name') {
      Object.keys(navHandling).forEach(key => {
        navHandling[key] = false
      })
      navHandling.colorName = true
      fetchColors()
      switchButton.removeEventListener('click', randomHslValue, false)
      switchButton.removeEventListener('click', randomExec, false)
      switchButton.removeEventListener('click', randomHexValue, false)
      switchButton.addEventListener('click', fetchColors)
    }

    if (element.className == 'rgb') {
      switcher = true
      Object.keys(navHandling).forEach(key => {
        navHandling[key] = false
      })
      navHandling.rgb = true
      randomExec()
      switchButton.removeEventListener('click', fetchColors, false)
      switchButton.removeEventListener('click', randomHslValue, false)
      switchButton.removeEventListener('click', randomHexValue, false)
      switchButton.addEventListener('click', randomExec)
    }

    if (element.className == 'hex') {
      Object.keys(navHandling).forEach(key => {
        navHandling[key] = false
      })
      navHandling.hex = true
      randomHexValue()
      switchButton.removeEventListener('click', fetchColors, false)
      switchButton.removeEventListener('click', randomExec, false)
      switchButton.removeEventListener('click', randomHslValue, false)
      switchButton.addEventListener('click', randomHexValue)
    }

    if (element.className == 'hsl') {
      Object.keys(navHandling).forEach(key => {
        navHandling[key] = false
      })
      navHandling.hsl = true
      randomHslValue()
      switchButton.removeEventListener('click', fetchColors, false)
      switchButton.removeEventListener('click', randomExec, false)
      switchButton.removeEventListener('click', randomHexValue, false)
      switchButton.addEventListener('click', randomHslValue)
    }

    navTable.forEach(el => {
      el.style.borderColor = 'white'
    })
    element.style.borderColor = 'black'
    element.style.transition = 'border-color .3s'
  })
})

//random colors from json file
fetchColors()

function randomNumber(max) {
  return Math.floor(Math.random() * max)
}

function changeBackgroundColor(color) {
  return (document.body.style.backgroundColor = color)
}

function switchTextValue(colorName) {
  document.querySelector('span').textContent = colorName
}

function changeSpanColor(color) {
  span.style.color = color
}

switchButton.addEventListener('click', fetchColors)

function fetchColors() {
  fetch('colors.json')
    .then(response => response.json())
    .then(data => {
      let number = randomNumber(data.colors.length)
      changeBackgroundColor(data.colors[number])
      switchTextValue(data.colors[number])
      changeSpanColor(data.colors[number])
    })
}

//rgb random

function randomExec() {
  random1 = randomValue(0, 255)
  random2 = randomValue(0, 255)
  random3 = randomValue(0, 255)
  span.textContent = `rgb(${random1}, ${random2}, ${random3})`
  changeBackgroundColor(`rgb(${random1},${random2},${random3})`)
  changeSpanColor(`rgb(${random1},${random2},${random3})`)
}

function randomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomHexValue() {
  let randomHex = `#${hexTable[randomValue(0, hexTable.length - 1)]}${hexTable[randomValue(0, hexTable.length - 1)]}${
    hexTable[randomValue(0, hexTable.length - 1)]
  }${hexTable[randomValue(0, hexTable.length - 1)]}${hexTable[randomValue(0, hexTable.length - 1)]}${
    hexTable[randomValue(0, hexTable.length - 1)]
  }`

  span.textContent = randomHex
  changeBackgroundColor(randomHex)
  changeSpanColor(randomHex)
}

function randomHslValue() {
  let randomHsl = randomValue(0, 360)
  let rand1 = randomValue(10, 100)
  let rand2 = randomValue(10, 100)

  span.textContent = `hsl(${randomHsl}, ${rand1}%, ${rand2}%)`
  changeBackgroundColor(`hsl(${randomHsl}, ${rand1}%, ${rand2}%)`)
  changeSpanColor(`hsl(${randomHsl}, ${rand1}%, ${rand2}%)`)
}
