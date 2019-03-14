const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {chatter} = require('../chatter')
const bodyParser = require('body-parser')
io.on('connection',(socket)=>{
    const bot=chatter("sorry I couldn't understand")
    
    //io.emit('response',"hello user")
    socket.on('userTyped',(message)=>{
            console.log(message)
        bot.respond(message,"testLayeredServiceBot3.nlp",0.9)
    .then(data=>{
        console.log(data)
        io.emit('response',data)})
        .catch(err=>console.log(err))
       
    
    })
//    app.post('/test', async(req, res) =>{
    
//     bot.respond(req.body.query,"testLayeredServiceBot3.nlp",0.9)
//     .then(data=>{
//         console.log(data)
//         io.emit('xyz',data)})
//         .catch(err=>console.log(err))
       
//     console.log("Type",typeof data)
//     res.send('Sent to all clients')
//     res.end()
// })

})


server.listen("8000", ()=>{
    console.log("Listening...")
})