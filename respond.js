const { NlpManager } = require('node-nlp');
const { SentimentAnalyzer } = require('node-nlp');
var fs = require('fs')

const manager = new NlpManager({ languages: ['en'] });




const respond=(phrase,fileName,threshold)=>{
    const exist=fs.existsSync(fileName)
    if (exist){
        manager.load(fileName)
    }else{
        
        return new Promise(async resolve=>{
            const sentiment = new SentimentAnalyzer({ language: 'en' });  
            const score=await sentiment.getSentiment(phrase)
            resolve(
                {
                answer:`The bot ${fileName} does not exist`,
                sentiment:score}
                )
    })
}

     return manager.process(phrase).then(
         data=>new Promise(resolve=>{
            //  console.log(data)
            //  console.log(data.score)
             if (data.score>threshold && data.answer){
                resolve(data)
             }else{
                resolve(data.answer="sorry didnt understand") 
             }
        }
    )
)}

module.exports={
    'respond':respond
}
