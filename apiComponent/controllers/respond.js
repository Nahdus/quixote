
const {chatter} = require('../../chatter')
const { SimilarSearch } = require('node-nlp')
const  {train} =require('../../trainer')
const { NlpManager ,NerManager } = require('node-nlp');

const fs = require('fs')
const { Language } = require('node-nlp');
let NERmanager = new NerManager({ threshold: 0.8 });
//const bot =chatter("Sorry I couldnn't get you")
const dclassify = require('dclassify')
exports.respond = async (req, res, next) => {
  try {
    const bot = chatter("Sorry I couldnn't get you");
    console.log(req.body);
    let response = await bot.respond(
      req.body.query,
      "testLayeredServiceBot3.nlp",
      "0.9"
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
};

exports.process = async (req, res, next) => {
  try {
    //const bot =chatter("Sorry I couldnn't get you")
    const manager = new NlpManager({ languages: ['en'] });
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
exports.handleEntity=async(req, res,next)=>{
    try{
        
        switch (req.body.action) {
            case 'addNamedEntity':
            
            try{
                await NERmanager.addNamedEntityText(
                req.body.entity,//'hero',
                req.body.entityName,//'spiderman',
                ['en'],
                req.body.possiableSpellings//['Spiderman', 'Spider-man'],
              );
              
              res.send('Entity added successfully')
            }catch(err){
                next(err)
            }
                break;
            case 'findEntities':
            try{
                NERmanager.findEntities(
                    req.body.phrase
                  ).then(entities => {
                    res.send(entities)
                  })
            }catch(err){
                next(err)
            }
                break;
            default:
                break;
        }
        
    }catch(err){
        next(err)
    }
}
    


exports.train = async (req, res, next) => {
  try {
    console.log(req.body.intent, req.body.utterances);
    console.log(typeof req.body.utterances);
    req.body.utterances.forEach(element => {
      manager.addDocument("en", element, req.body.intent);
    });

    await manager.train();
    manager.save();
    res.send("Training completed");
  } catch (err) {
    next(err);
  }
};
exports.identifyIntent = async (req, res, next) => {
  try {
    const manager = new NlpManager({
      languages: ["en"],
      fullSearchWhenGuessed: true
    });
    manager.load("model.nlp");
    const { intent } = await manager.process("en", req.body.phrase);
    console.log(intent);
    res.send(intent);
  } catch (err) {
    next(err);
  }
};
exports.clearTraining = async (req, res, next) => {
  try {
    const manager = new NlpManager({
      languages: ["en"],
      fullSearchWhenGuessed: true
    });
    // manager.load("model.nlp")
    manager.clear();
    await fs.unlink("./model.nlp", err => {
      if (err) {
        console.log(err);
      }
    });
    res.send("cleared the manager");
  } catch (err) {
    next(err);
  }
};
exports.languageGuess = async (req, res, next) => {
  try {
    const language = new Language();
    const guess = await language.guess(req.body.phrase);
    res.send(guess);
  } catch (err) {
    next(err);
  }
};
exports.analyseSentiment = async (req, res, next) => {
  try {
    const sentiment = require("node-sentiment");
    const senti = await sentiment(req.body.phrase, "en");
    res.send(senti);
  } catch (err) {
    next(err);
  }
};
exports.classify = async(req, res, next)=>{
    try {
        switch (res.body.action) {
            case 'train':
            var Classifier = dclassify.Classifier;
            var DataSet    = dclassify.DataSet;
            var Document   = dclassify.Document;

                break;
            case 'test':

                break;
            default:
                break;
        }
      } catch (err) {
        next(err);
      }
}
