let dynamicIDHashtags = 0
let data = ''

function Label(id) {
  return document.getElementById(id)
}

function SearchSpan(input) {
  this.span = document.createElement('span')
  this.btn = document.createElement('button')
  this.input = input
}

SearchSpan.prototype.create = function() {
  this.btn.innerHTML = 'x'
  this.btn.setAttribute('id', ++dynamicIDHashtags)
  this.btn.className = 'span-btn'
  this.span.className = this.input.id === 'keywords' ? 'keyw-span' : 'hash-span'

  this.btn.addEventListener('click', e => {
    e.preventDefault()
    let container = e.target.parentNode.parentNode
    let containerChilds = Array.from(container.childNodes)

    containerChilds.forEach(element => {
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
  } else {
    this.span.innerText =
      this.input.value[0] === '#'
        ? '' + this.input.value
        : '#' + this.input.value
  }

  this.span.appendChild(this.btn)
}

SearchSpan.prototype.renderIn = function(label) {
  label.appendChild(this.span)
}

function Input(id) {
  this.input = document.getElementById(id)
  this.id = id
}

Input.prototype.getValue = function() {
  return this.input.value
}

Input.prototype.clear = function() {
  this.input.value = ''
}

Input.prototype.hasSpaces = function() {
  if (/\s/.test(this.input.value)) {
    return true
  } else {
    return false
  }
}

Input.prototype.listen = function() {
  this.input.addEventListener('keypress', e => {
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

const submitBtn = document.getElementById('submit')
submitBtn.addEventListener('click', e => {
  e.preventDefault()
  let hashtags = [],
    keywords = []

  let hashSpans = document.getElementsByClassName('hash-span')
  Array.from(hashSpans).forEach(el => {
    hashtags.push(percentEncode(el.innerText.slice(1, -2)))
  })

  let keyWSpans = document.getElementsByClassName('keyw-span')
  Array.from(keyWSpans).forEach(el => {
    keywords.push(percentEncode(el.innerText.slice(0, -2)))
  })

  let url = new URL('https://5191d8f9.ngrok.io/'),
    params = {
      hashtags:
        Array.isArray(hashtags) && hashtags.length
          ? hashtags.join(' ') + ' ' + hashtagsInput.getValue().trim() || ''
          : hashtagsInput.getValue() || '',
      keywords:
        Array.isArray(keywords) && keywords.length
          ? keywords.join(' ') + ' ' + keywordsInput.getValue().trim() || ''
          : keywordsInput.getValue() || '',
    }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  window.location.href = url.href
})

const percentEncode = str =>
  encodeURIComponent(str).replace(
    /[!*()']/g,
    char => '%' + char.charCodeAt(0).toString(16),
  )
