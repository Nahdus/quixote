const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData2')
var assert = require('assert');
const fs = require('fs')

describe('file: multiResponseChattertestx10.js multi response chatter testX10:test to check response when utterance are trained with multiple text response', 
()=>{
    before(
        async ()=>{
            const train= ()=>new Promise((resolve,reject)=>{
              resolve(tainingFunction())
              })
              await train()
           
      }
        
      )
    after(async ()=> {
        await fs.unlink('./'+nlpfile,(err)=>{
            if(err){console.log(err)}
            
        })
      })
    const testit=async()=>{
        
            let response = await chatter('Hello',nlpfile,'0.9');
            let responseList=["Hi happy to see you today","Hello happy to see you today","Hello how may i help you"]
            assert.notEqual(responseList.indexOf(response),-1)
            
        
        
            response = await chatter('need your help finding my car',nlpfile,'0.9')
            responseList=["sure can you give me your car number","may i have your car number","your car number please"]
            assert.notEqual(responseList.indexOf(response),-1)
         
         
            response = await chatter("what is my car ",nlpfile,'0.9')
            responseList=["sure can you give me your car registartion number","may i have your car registration number","your car registration number please"]
            assert.notEqual(responseList.indexOf(response),-1)
       
            response = await chatter("shut up ",nlpfile,'0.9')
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
