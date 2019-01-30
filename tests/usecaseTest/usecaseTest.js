const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData3')
var assert = require('assert');
const fs = require('fs')

describe('advanced test to expect answer for trained phrases', ()=>{
    before(
         ()=>{
             tainingFunction()
        }
        
      )
    after(()=> {
        fs.unlink('./'+nlpfile,(err)=>{
            if(err){console.log(err)}
            
        })
      })
    
    it('it should return intro intent response',
    async ()=>{
        let response = await chatter('Hello','testBot.nlp','0.9');
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        assert.notEqual(responseList[response],-1)
        
    })
    it('it should return planExpiry intent response',
    async ()=>{
        let response = await chatter('need your help finding my mobile plan expiry date','testBot.nlp','0.9');
        let responseList=["sure type your phone number"]
        assert.notEqual(responseList[response],-1)
        
    })
    
})
