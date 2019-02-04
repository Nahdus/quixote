const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData3')
var assert = require('assert');
const fs = require('fs')

describe('file: usecaseTest.js advanced test to expect answer for trained phrases', ()=>{
    before(
         async ()=>{
             await tainingFunction()
        }
    )
    after(async ()=> {
        await fs.unlink('./'+nlpfile,(err)=>{
            if(err){console.log(err)}
            
        })
      })
    
    it('it should return intro intent response',
    async ()=>{
        let response = await chatter('Hello',nlpfile,'0.9');
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        assert.notEqual(responseList.indexOf(response),-1)
        
    })
    it('it should return planExpiry intent response',
    async ()=>{
        let response = await chatter('when is my service scheme expiring',nlpfile,'0.9');
        let responseList=["sure type your phone number"]
        assert.notEqual(responseList.indexOf(response),-1)
        
    })
    it('accepts phone number',
    async ()=>{
        let response = await chatter('7598677634',nlpfile,'0.9');
        console.log(response)
        let responseList=["Thanks for confirming"]
        assert.notEqual(responseList.indexOf(response),-1)
    })
    
})