const express = require('express')
const responder = require('./apiComponent/routes/respond.js');
const bodyParser = require('body-parser')

const port=8000
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/getResponse', responder)

app.listen(port,(e)=>{
    // console.log(e)
})