const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData1')
var assert = require('assert');
const fs = require('fs')

describe('basic Chatter test', ()=>{
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
        
        //console.log(response)
        assert.equal(response,"Hi happy to see you today")
        
    })
    it('it should return helpCar intent response',async()=>{
       let response = await chatter('need your help finding my car','testBot.nlp','0.9')
       assert.equal(response,"sure can you give me your car number")
    })
    it('it should return helplicence intent response',async()=>{
        let response = await chatter("what is my car ",'testBot.nlp','0.9')
        assert.equal(response,"sure can you give me your car registartion number")
    })
})
