const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData2')
var assert = require('assert');
const fs = require('fs')
const expect =require('expect')

describe('file:MultiResponseChattertest.js multi response chatter test:test to check response when utterance are trained with multiple text response', 
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
    
    it('it should return any of the intro intent response',
    async ()=>{
        defaultResponse="sorry I couldnt understand you"
        bot=chatter(defaultResponse)
        let response = await bot.respond('Hello',nlpfile,'0.9');
        let responseList=["Hi happy to see you today","Hello happy to see you today","Hello how may i help you"]
        expect(responseList).toContain(response)
        
    })
    it('it should return any of the helpCar intent response',async()=>{
       let response = await bot.respond('need your help finding my car',nlpfile,'0.9')
       responseList=["sure can you give me your car number","may i have your car number","your car number please"]
       expect(responseList).toContain(response)
    })
    it('it should return any of the helplicence intent response',async()=>{
        let response = await bot.respond("what is my car ",nlpfile,'0.9')
        responseList=["sure can you give me your car registartion number","may i have your car registration number","your car registration number please"]
        expect(responseList).toContain(response)
    })
    it('it should return null if intent is not identified',async()=>{
        let response = await bot.respond("shut up ",nlpfile,'0.9')
        expect(response).toBe(defaultResponse)
    })
})
