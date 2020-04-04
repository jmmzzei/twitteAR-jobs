let dynamicIDHashtags = 0
let data = ''
console.log(1)

function Label(id) {
  return document.getElementById(id)
}

function SearchSpan(input) {
  this.span = document.createElement('span')
  this.btn = document.createElement('button')
  this.input = input
}
console.log(2)

SearchSpan.prototype.create = function () {
  this.btn.innerHTML = 'x'
  this.btn.setAttribute('id', ++dynamicIDHashtags)
  this.btn.className = 'span-btn'

  if (this.input.id === 'keywords') {
    this.span.className = 'keyw-span'
  } else if (this.input.id === 'hashtags') {
    this.span.className = 'hash-span'
  } else {
    this.span.className = 'unwanted-span'
  }

  this.btn.addEventListener('click', (e) => {
    e.preventDefault()
    let container = e.target.parentNode.parentNode
    let containerChilds = Array.from(container.childNodes)

    containerChilds.forEach((element) => {
      if (
        element.childNodes.length > 1 &&
        element.childNodes[1].id === e.target.id
      ) {
        container.removeChild(element)
      }
    })
  })

  if (this.input.id === 'keywords') {
    this.span.innerText = this.input.value
  } else if (this.input.id === 'hashtags') {
    this.span.innerText =
      this.input.value[0] === '#'
        ? '' + this.input.value
        : '#' + this.input.value
  } else {
    this.span.innerText =
      this.input.value[0] === '-'
        ? '' + this.input.value
        : '-' + this.input.value
  }
  console.log(3)

  this.span.appendChild(this.btn)
}

SearchSpan.prototype.renderIn = function (label) {
  label.appendChild(this.span)
}

function Input(id) {
  this.input = document.getElementById(id)
  this.id = id
}

Input.prototype.getValue = function () {
  return this.input.value
}

Input.prototype.clear = function () {
  this.input.value = ''
}

Input.prototype.hasSpaces = function () {
  if (/\s/.test(this.input.value)) {
    return true
  } else {
    return false
  }
}

Input.prototype.listen = function () {
  this.input.addEventListener('keypress', (e) => {
    if (this.hasSpaces()) {
      let searchSpan = new SearchSpan(this.input)
      let label = new Label(`${this.id}-label`)
      searchSpan.create()
      searchSpan.renderIn(label)
      this.clear()
    }
  })
}

let keywordsInput = new Input('keywords')
keywordsInput.listen()

let hashtagsInput = new Input('hashtags')
hashtagsInput.listen()

let unwantedInput = new Input('unwanted')
unwantedInput.listen()

const submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  let hashtags = [],
    keywords = [],
    unwanted = []

  let hashSpans = document.getElementsByClassName('hash-span')
  Array.from(hashSpans).forEach((el) => {
    hashtags.push(percentEncode(el.innerText.slice(1, -2)))
  })

  let keyWSpans = document.getElementsByClassName('keyw-span')
  Array.from(keyWSpans).forEach((el) => {
    keywords.push(percentEncode(el.innerText.slice(0, -2)))
  })

  let unwantedSpans = document.getElementsByClassName('unwanted-span')
  Array.from(unwantedSpans).forEach((el) => {
    unwanted.push(percentEncode(el.innerText.slice(1, -2)))
  })

  let url = new URL('https://twittear-jobs.herokuapp.com/search/'),
    params = {
      hashtags:
        Array.isArray(hashtags) && hashtags.length
          ? hashtags.join(' ') + ' ' + hashtagsInput.getValue().trim() || ''
          : hashtagsInput.getValue() || '',
      keywords:
        Array.isArray(keywords) && keywords.length
          ? keywords.join(' ') + ' ' + keywordsInput.getValue().trim() || ''
          : keywordsInput.getValue() || '',
      unwanted:
        Array.isArray(unwanted) && unwanted.length
          ? unwanted.join(' ') + ' ' + unwantedInput.getValue().trim() || ''
          : unwantedInput.getValue() || '',
    }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key]),
  )
  window.location.href = url.href
})

const percentEncode = (str) =>
  encodeURIComponent(str).replace(
    /[!*()']/g,
    (char) => '%' + char.charCodeAt(0).toString(16),
  )
