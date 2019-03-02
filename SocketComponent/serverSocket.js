const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const {chatter} = require('../chatter')
const bodyParser = require('body-parser')
io.on('connection',()=>{
    const bot=chatter()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}))
   app.post('/test', async(req, res) =>{
    bot.respond(req.body.query,"testLayeredServiceBot3.nlp",0.9)
    .then(data=>{
        io.emit('xyz',data)})
        .catch(err=>console.log(err))
       
    
    res.send('Sent to all the clients')
    res.end()
})
})


server.listen("8000", ()=>{
    console.log("Listening...")
})


