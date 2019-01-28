const  {train} = require('../trainer');
const assert = require('assert');
const fs = require('fs')


describe('Basic training Success Test', function () {
    after(()=> {
        fs.unlink('./testBot.nlp',(err)=>{
            if(err){console.log(err)}
            
        })
      })
 it('should return success', async ()=>{
     let response=await train("intro",//IntentName
     ["Hello","Hi","How are you","howdy","wassup"],//utterances
     ["Hello","Hi","How are you","howdy","wassup"],//responses
     "testBot.nlp"//fileName
     )
        assert.equal(
            response, 'success');
    }

    );
it('should return success', async ()=>{
    let response=await train("cost",//IntentName
    ["what is the cost","how much does it cost","how much?"],//utterances
    ["2000 rs","Two-thousand","it's 2000 rupees ","two-thousand rupees thats all it costs","you'd have to pay 2000 rs"],//responses
    "testBot.nlp"//fileName
        )
           assert.equal(
               response, 'success');
       }
   
       );

 
});


