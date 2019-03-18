const express = require('express')
const responder = require('./routes/respond.js');
const bodyParser = require('body-parser')
var cors = require('cors')

const port=8000
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', responder)
// app.use('/guessLanguage', responder)
// app.use('/extractEntity', responder)
// app.use('/similarSearch', responder)

app.listen(port,(e)=>{
    console.log("listening to port ",port)
})