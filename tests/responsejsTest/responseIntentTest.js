const {respond} = require('../../response')
const {tainingFunction,nlpfile}=require('../TrainingData1')
var assert = require('assert');
const fs = require('fs')

describe('file: responseIntentTest.js advanced test to expect answer for trained phrases', ()=>{
    before(
         async()=>{
             await tainingFunction()
        }
        
      )
    after(()=> {
        fs.unlink('./'+nlpfile,(err)=>{
            if(err){console.log(err)}
            
        })
      })
    
    it('it should return intro intent',
    async ()=>{
        let response = await respond('Hello',nlpfile,'0.9');
        // console.log(nlpfile)
        assert.equal(response.intent,'greet')
        
    })
    it('it should return helpCar intent',async()=>{
       let response = await respond('need your help finding my car',nlpfile,'0.9')
    //console.log(nlpfile)
       assert.equal(response.intent,'helpCar')
    })
    it('it should return helplicence intent',async()=>{
        let response = await respond("what is my car ",nlpfile,'0.9')
        // console.log(nlpfile)
        assert.equal(response.intent,'helplicence')
    })
    it('it should return none intent',async()=>{
        let response = await respond("shut up? ",nlpfile,'0.9')
        // console.log(nlpfile)
        assert.equal(response.intent,'None')
    })
})
