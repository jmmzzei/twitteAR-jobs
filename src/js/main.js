import "../css/style.css"
import { Input } from './classes/Input'
import { submitHandler } from './submitHandler'

let keywordsInput = new Input('keywords')
keywordsInput.listen()

let hashtagsInput = new Input('hashtags')
hashtagsInput.listen()

let unwantedInput = new Input('unwanted')
unwantedInput.listen()

const submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    submitHandler(hashtagsInput, unwantedInput, keywordsInput)
})

const btnToggle = document.getElementById('btn-toggle')
btnToggle.addEventListener('click', () => {
    toggleMenu()
})

function toggleMenu() {
    const search = document.getElementsByClassName('search')[0]
    search.setAttribute('style', `display: ${search.style.display === 'flex' ? 'none' : 'flex'}`)
}
