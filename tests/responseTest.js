const  {train} = require('../trainer');
const {respond} = require('../respond')
var assert = require('assert');
const fs = require('fs')

describe('basic test to expect answer for trained phrases', ()=>{
    before(async () =>{
        await train("intro",//IntentName
     ["Hello","Hi","How are you","howdy","wassup"],//utterances
     ["Hello","Hi","How are you","howdy","wassup"],//responses
     "testBot.nlp"//fileName
     )
      })
    after(()=> {
        fs.unlink('./testBot.nlp',(err)=>{
            if(err){console.log(err)}
            
        })
      })
    it('it should return either of these ["Hello","Hi","How are you","howdy","wassup"]',
    async ()=>{
        let response = await respond('Hello','testBot.nlp','0.9');
        //console.log(response)
        assert.notEqual((["Hello","Hi","How are you","howdy","wassup"]).indexOf(response.srcAnswer),-1)
        
    })
    it('it should say "sorry didnt understand"',async()=>{
       let response = await respond('shut up','testBot.nlp','0.9')
        assert.equal('sorry didnt understand',response)
    })
})