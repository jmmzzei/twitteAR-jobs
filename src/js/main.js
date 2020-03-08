
let dynamicIDHashtags = 0

let keywordsInput = document.getElementById('keywords')
keywordsInput.addEventListener('keypress', e => {
  if (/\s/.test(keywordsInput.value)) {
    let newInput = document.createElement('span')
    let spanBtn = document.createElement('button')
    spanBtn.innerHTML = 'x'
    spanBtn.setAttribute('id', dynamicIDHashtags)
    spanBtn.className = 'span-btn'
    newInput.className = 'keyw-span'

    dynamicIDHashtags++

    spanBtn.addEventListener('click', e => {
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

    newInput.innerText = keywordsInput.value
    newInput.appendChild(spanBtn)

    let keywordsLabel = document.getElementById('keywords-label')
    keywordsLabel.appendChild(newInput)

    keywordsInput.value = ''
  }
})

let hashtagsInput = document.getElementById('hashtags')
hashtagsInput.addEventListener('keypress', e => {
  if (/\s/.test(hashtagsInput.value)) {
    let newInput = document.createElement('span')
    let spanBtn = document.createElement('button')
    spanBtn.innerHTML = 'x'
    spanBtn.setAttribute('id', dynamicIDHashtags)
    spanBtn.className = 'span-btn'
    newInput.className = 'hash-span'

    dynamicIDHashtags++

    spanBtn.addEventListener('click', e => {
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

    newInput.innerText =
      hashtagsInput.value[0] === '#'
        ? '' + hashtagsInput.value
        : '#' + hashtagsInput.value
    newInput.appendChild(spanBtn)

    let hashtagsLabel = document.getElementById('hashtags-label')
    hashtagsLabel.appendChild(newInput)

    hashtagsInput.value = ''
  }
})

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

  let country = document.getElementById('country')
  let countryValue = percentEncode(country.value)



  var url = new URL('http://localhost:3000/search/'),
    params = { 
        country: countryValue, 
        hashtags:  Array.isArray(hashtags) && hashtags.length ? hashtags : hashtagsInput.value,
        keywords:  Array.isArray(keywords) && keywords.length ? keywords : keywordsInput.value 
        }
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  fetch(url)
})

const percentEncode = str =>
encodeURIComponent(str).replace(/[!*()']/g, char => 
    '%' + char.charCodeAt(0).toString(16))


const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
    theme.innerHTML = theme.innerHTML == "Light" ? "Dark" : "Light";
    if (theme.innerHTML == "Light") {
        document.body.style.background = "#0e0e25";
        document.body.style.color = "#fff";
        document.body.style.transition = "all 0.4s linear"
    } else {
        document.body.style.background = "#f1f1f1";
        document.body.style.color = "#333";
        document.body.style.transition = "all 0.4s linear"
    }
});
