const {respond} = require('../../response')
const {tainingFunction,nlpfile}=require('../TrainingData1')
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
    
    it('it should return intro intent',
    async ()=>{
        let response = await respond('Hello','testBot.nlp','0.9');
        assert.equal(response.intent,'intro')
        
    })
    it('it should return helpCar intent',async()=>{
       let response = await respond('need your help finding my car','testBot.nlp','0.9')
       assert.equal(response.intent,'helpCar')
    })
    it('it should return helplicence intent',async()=>{
        let response = await respond("what is my car ",'testBot.nlp','0.9')
        assert.equal(response.intent,'helplicence')
    })
    it('it should return none intent',async()=>{
        let response = await respond("whats up? ",'testBot.nlp','0.9')
        assert.equal(response.intent,'None')
    })
})
