const {chatter} = require('../../chatter')
const {tainingFunction,nlpfile}=require('../TrainingData3')
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
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        console.log('response',response)
        assert.notEqual(responseList.indexOf(response),-1)
        //console.log(response)
    })
    it('it should return planExpiry intent response',async()=>{
       let response = await chatter("when is my service scheme expiring",nlpfile,'0.9')
       console.log('response',response)
       let responseList=["sure please type your phone number"]
        assert.notEqual(responseList.indexOf(response),-1)
    })
    
  
//   it('it should return phonenumberintent success response',async()=>{
//     let response = await chatter("my phone number is 7598528295 ",nlpfile,'0.9')
//     console.log('response',response)
//     let responseList=["Thanks for confirming","Available balance for 7598528295 is 25"]
    
//     assert.equal(responseList.every(val => response.includes(val)),true)
//     // assert.notEqual(responseList.indexOf(response),-1)
   
// })
it('it should return phonenumberintent failure response',async()=>{
  let response = await chatter("wuba luba dub dub ",nlpfile,'0.9')
  console.log('response',response)
  let responseList=["I couldnt get your phone nummber could you type again?"]
  
  assert.equal(responseList.every(val => response.includes(val)),true)
  assert.notEqual(responseList.indexOf(response),-1)
 
})
  it('it should return phonenumberintent success response',async()=>{
    let response = await chatter("my phone number is 7598528295 ",nlpfile,'0.9')
    console.log('response',response)
    let responseList=["Thanks for confirming","Available balance for 7598528295 is 25"]
    
    assert.equal(responseList.every(val => response.includes(val)),true)
    // assert.notEqual(responseList.indexOf(response),-1)
   
})
it(' saying hello again',
    async ()=>{
        let response = await chatter('Hello',nlpfile,'0.9');
        let responseList=["Hi, how may i help you?",'Hello, how may I help you']
        console.log('response',response)
        assert.notEqual(responseList.indexOf(response),-1)
        //console.log(response)
    })

})
