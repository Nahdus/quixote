
const {chatter} = require('../../chatter')
const { SimilarSearch } = require('node-nlp')
const  {train} =require('../../trainer')
const { NlpManager ,NerManager } = require('node-nlp');
const thesaurus = require('thesaurus');
const fs = require('fs')
const { Language } = require('node-nlp');
let NERmanager = new NerManager({ threshold: 0.8 });
//const bot =chatter("Sorry I couldnn't get you")
const dclassify = require('dclassify')
const manager = new NlpManager({ languages: ["en"] })
let DclassifyData
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
    wordDistance = req.body.words.map((word)=>{
      console.log(word)
      return (word,similar.getSimilarity(req.body.target,word));
    })
    
    console.log(wordDistance)
    res.send(wordDistance)
    
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
          let Classifier = dclassify.Classifier;
          let DataSet    = dclassify.DataSet;
          let Document   = dclassify.Document;
          
          let data = new DataSet()
          let options = {
            applyInverse: true
        };
        console.log(req.body.action)
        let classifier=new Classifier(options)
       
          
      switch (req.body.action) {
          case 'addDocument':
          const Items=req.body.items.map((item)=>{
            return new Document(item.name,item.list)
          })
          console.log(Items)
          if(!DclassifyData){

            data.add(req.body.categoryName,Items);
            console.log(data)
            DclassifyData=data
          }else{
            DclassifyData.add(req.body.categoryName,Items)
          }
          
          console.log(DclassifyData)
          
          res.send("done pa")

              break;
          case 'test':
            
            classifier.train(DclassifyData)
            console.log("DclassifyData")
            console.log(DclassifyData)
            const test =new Document(req.body.name, req.body.list)
            console.log("result")
            const result=classifier.classify(test)
            DclassifyData=undefined
            res.send(result)
              break;
          default:
              break;
      }
    } catch (err) {
      res.send("json is wrong")
      next(err);
    }
  }
exports.similarityCheck = async (req, res, next) => {
  const Checksimilarity = (search_word,sentence)=>{
    const regxMatcher=(word1,word2)=>{
        const regex = new RegExp(word1)
        return regex.test(word2)
    }
    const returnmatchList=(words,word)=>words.find((eachWord)=>regxMatcher(eachWord,word))
    const thesaurus_words = thesaurus.find(search_word);
    thesaurus_words.push(search_word)
    const TokenizedSentence=sentence.replace(/[^a-zA-Z ]/g, "").split(" ")
    return {"similarWord":TokenizedSentence.map((eachWord)=>returnmatchList(thesaurus_words,eachWord)).filter((x)=>x)}
}
        try {
          const words =Checksimilarity(req.body.word,req.body.sentence)
          console.log(words)
          res.send(words)
        } catch (err) {
          next(err);
        }
};


