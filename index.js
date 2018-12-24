const  {train} = require('./trainer');
const  {respond} = require('./respond');


(async ()=>{
    await train("intro",["Hello","Hi","How are you","howdy","wassup"],["Hello","Hi","How are you","howdy","wassup"],"testBot.nlp")
    await train("I-phone",["Tell me about I-phone"],["Sure, ask anything you want to know about it"],"testBot.nlp")
    await train("Samsung",["Tell me about Samsung"],["Sure, ask anything you want to know about it"],"testBot.nlp")
    await train("Nokia",["Tell me about Nokia"],["Sure, ask anything you want to know about it"],"testBot.nlp")
    // respond("hello my email id is b.j.ponsudhan@gmail.com #sudhanRules","testBot.nlp",0.5).then(data=>{
    //     console.log(data)
    // })


})()