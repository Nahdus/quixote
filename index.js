const  {train} = require('./trainer');
const  {respond} = require('./respond');


(async ()=>{
    await train("musically",["what are you hobby","any activities you enjoy","let talk about your hobby"],["i enjoy fishing","i go fishing"],"botCR7.nlp")
    respond("i hate you","botCR7.nlp",0.5).then(data=>{
        console.log(data)
    })


})()