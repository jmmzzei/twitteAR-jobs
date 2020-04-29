function SearchSpan(input) {
  this.span = document.createElement('span')
  this.btn = document.createElement('button')
  this.input = input
}

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

  this.span.appendChild(this.btn)
}

SearchSpan.prototype.renderIn = function (label) {
  label.appendChild(this.span)
}




