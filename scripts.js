const socket = io('https://afternoon-springs-96024.herokuapp.com/')
const messageContainerOther = document.getElementById('message-container-other')
const messageContainerSelf = document.getElementById('message-container-self')
const messageForm = document.getElementById('send-container')
const buttonArea = document.getElementById('button-area')
const messageInput = document.getElementById('input-message')

const name = prompt('what is your name?')
messageSendSelf('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    messageSendSelf(data.name + ': ' + data.message);
})
socket.on('user-connect', name => {
    messageSendSelf(name + ' joined');
})

buttonArea.addEventListener('click', e => {
    let message = messageInput.value
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function messageSendSelf(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainerSelf.append(messageElement)
}
