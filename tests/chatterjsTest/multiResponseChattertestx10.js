const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData2')
var assert = require('assert');
const fs = require('fs')

describe('multi response chatter testX10:test to check response when utterance are trained with multiple text response', 
()=>{
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
    const testit=async()=>{
        
            let response = await chatter('Hello','testBot.nlp','0.9');
            let responseList=["Hi happy to see you today","Hello happy to see you today","Hello how may i help you"]
            assert.notEqual(responseList[response],-1)
            
        
        
            response = await chatter('need your help finding my car','testBot.nlp','0.9')
            responseList=["sure can you give me your car number","may i have your car number","your car number please"]
            assert.notEqual(responseList[response],-1)
         
         
            response = await chatter("what is my car ",'testBot.nlp','0.9')
            responseList=["sure can you give me your car registartion number","may i have your car registration number","your car registration number please"]
            assert.notEqual(responseList[response],-1)
       
            response = await chatter("shut up ",'testBot.nlp','0.9')
            assert.equal(response,null)
        
    }
    
      
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
    it("again",testit)
})
