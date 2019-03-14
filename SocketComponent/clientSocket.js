var socket = require('socket.io-client')('http://localhost:8000')



socket.on('message', (user,bot)=>{
    //emit message from particular user to particular bot
})
socket.on('reply', (user,bot)=>{
    //emit message from particular bot to that particular user
})

