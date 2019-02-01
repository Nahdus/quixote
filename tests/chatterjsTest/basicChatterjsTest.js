const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData1')
var assert = require('assert');
const fs = require('fs')

describe("file:basicChattertest.js", ()=>{
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
    
    it(' it should return intro intent response',
    async ()=>{
        let response = await chatter('Hello',nlpfile,'0.9');
        let responseList=["Hi happy to see you today"]
        assert.notEqual(responseList.indexOf(response),-1)
        //console.log(response)
       
        
    })
    it('it should return helpCar intent response',async()=>{
       let response = await chatter('need your help finding my car',nlpfile,'0.9')
       let responseList=["sure can you give me your car number"]
        assert.notEqual(responseList.indexOf(response),-1)
    })
    it('it should return helplicence intent response',async()=>{
        let response = await chatter("what is my car ",nlpfile,'0.9')
        let responseList=["sure can you give me your car registartion number"]
        assert.notEqual(responseList.indexOf(response),-1)
       
    })
})
