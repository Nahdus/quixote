
const {chatter} = require('../../chatter')
const { SimilarSearch } = require('node-nlp')
const  {train} =require('../../trainer')
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
const fs = require('fs')
const { Language } = require('node-nlp');
//const bot =chatter("Sorry I couldnn't get you")
exports.respond=async (req, res,next)=> {
   try{
    const bot =chatter("Sorry I couldnn't get you")
       console.log(req.body)
       let response = await bot.respond(req.body.query,"testLayeredServiceBot3.nlp",'0.9');
       res.send(response);
   }catch(err){
       next(err)
   }
};

exports.process=async (req, res,next)=> {
   try{
    //const bot =chatter("Sorry I couldnn't get you")
       console.log(req.body)
       let response = await manager.process(req.body.query);
       res.send(response);
   }catch(err){
       next(err)
   }
};

exports.getSimilarity=(req, res,next)=>{
    try{
    const similar = new SimilarSearch()
    console.log(req.body.word1,req.body.word2)
    let similarity=similar.getSimilarity(req.body.word1, req.body.word2);
    console.log(similarity)
    res.send('levenshtein distance '+similarity.toString())
    
    }catch(err){
        next(err)
    }
}
exports.train=async (req, res,next)=>{
    try{
        console.log(req.body.intent,req.body.utterances)
        console.log(typeof req.body.utterances)
        req.body.utterances.forEach(element => {
            manager.addDocument('en', element, req.body.intent)
        });
        
        await manager.train()
        manager.save()
        res.send('Training completed')
    }catch(err){
        next(err)
    }
}
exports.identifyIntent=async(req, res,next)=>{
    try{
        const manager = new NlpManager({ languages: ['en'],fullSearchWhenGuessed:true });
        manager.load("model.nlp")
        const {intent}= await manager.process('en',req.body.phrase)
        console.log(intent)
        res.send(intent)
    }catch(err){
        next(err)
    }
}
exports.clearTraining=async(req, res,next)=>{
    try{
        const manager = new NlpManager({ languages: ['en'],fullSearchWhenGuessed:true });
        // manager.load("model.nlp")
        manager.clear()
        await fs.unlink('./model.nlp',(err)=>{
            if(err){console.log(err)}
        })
        res.send("cleared the manager")
    }catch(err){
        next(err)
    }
}
exports.languageGuess=async(req, res,next)=>{
    try{
        const language = new Language()
        const guess = await language.guess(req.body.phrase)
        res.send(guess)
    }catch(err){
        next(err)
    }
}