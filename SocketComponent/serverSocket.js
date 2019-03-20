const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer()
const io = require('socket.io')(server)
const {chatter} = require('../chatter')

const connections=[]
io.on('connection',(socket)=>{
    const bot=chatter("sorry I couldn't understand")
    connections.push(socket)
    console.log('some one joined')
    socket.on('userTyped',(message)=>{
            console.log(message)
        bot.respond(message,"testLayeredServiceBot3.nlp",0.9)
    .then(data=>{
        console.log(data)
        socket.emit('response',data)})
        .catch(err=>console.log(err))
       
    
    })
    socket.on('disconnect',()=>{
        const i=connections.indexOf(socket)
        connections.splice(i,1)
        console.log('We lost some one')
    })


})


server.listen("8000", ()=>{
    console.log("Listening...")
})