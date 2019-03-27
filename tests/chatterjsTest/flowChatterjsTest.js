const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData3')
var assert = require('assert');
const fs = require('fs')
const expect =require('expect')

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
    
    it(' it should return intro intent response:/n Hello',
    async ()=>{
        bot=chatter('sorry')
        let response = await bot.respond('Hello',nlpfile,'0.9');
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        
        expect(responseList).toContain(response)
        
    })
    it('it should return planExpiry intent response:/n when is my service scheme expiring',async()=>{
       let response = await bot.respond("when is my service scheme expiring",nlpfile,'0.9')
       let responseList=["sure please type your phone number"]
      //  console.log('response',response)
      //  console.log('responselist',responseList)
       expect(responseList).toContain(response)
    })
    
  
//   it('it should return phonenumberintent success response',async()=>{
//     let response = await chatter("my phone number is 7598528295 ",nlpfile,'0.9')
//     console.log('response',response)
//     let responseList=["Thanks for confirming","Available balance for 7598528295 is 25"]
    
//     assert.equal(responseList.every(val => response.includes(val)),true)
//     // assert.notEqual(responseList.indexOf(response),-1)
   
// })
it('it should return phonenumberintent failure response: /n wuba luba dub dub',async()=>{
  let response = await bot.respond("wuba luba dub dub ",nlpfile,'0.9')
  let responseList=["I couldnt get your phone nummber could you type again?"]
  expect(responseList).toContain(response)
  // assert.equal(responseList.every(val => response.includes(val)),true)
  // assert.notEqual(responseList.indexOf(response),-1)
 
})
  it('it should return phonenumberintent success response: /n my phone number is 7598528295',async()=>{
    let response = await bot.respond("my phone number is 7598528295 ",nlpfile,'0.9')
    let responseList=["Thanks for confirming","Available balance for 7598528295 is 25"]
    expect(responseList).toEqual(response)
       
})
it(' saying hello again:/n Hello',
    async ()=>{
        let response = await bot.respond('Hello',nlpfile,'0.9');
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        expect(responseList).toContain(response)
        // assert.notEqual(responseList.indexOf(response),-1)
        //console.log(response)
    })
    it(' asking for balance in one go',
    async ()=>{
        let response = await bot.respond('I want to know my balance for 7598528295',nlpfile,'0.9');
        let responseList=["Thanks for confirming","Available balance for 7598528295 is 25"]
        expect(responseList).toContain(response)
        // assert.notEqual(responseList.indexOf(response),-1)
        //console.log(response)
    })

})
