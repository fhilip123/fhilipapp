const io = require("socket.io")(3000)

const users = {}

io.on('connection', socket => {
    console.log('new user')
    socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connect', name)
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message',{ message: message, name: users[socket.id]})
        socket.emit('chat-message',{ message: message, name: users[socket.id]})
    })
})