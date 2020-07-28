export const createWarning = () => {
    const wrapper = document.getElementsByClassName('wrapper')[0]
    const messageWrapper = document.createElement('div')
    const message = document.createElement('p')
    messageWrapper.className = 'message-wrapper'
    message.innerText = 'NOTHING TO SEARCH'
    message.className = 'message'
    const submessage = document.createElement('p')
    submessage.innerText = 'Please, fill at least one input.'
    submessage.className = 'submessage'
    messageWrapper.appendChild(message)
    messageWrapper.appendChild(submessage)
    wrapper.appendChild(messageWrapper)
}
