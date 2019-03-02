var socket = require('socket.io-client')('http://localhost:8000')


socket.on('xyz', (data)=>{
    console.log(data)
})

