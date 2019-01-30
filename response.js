const { NlpManager } = require('node-nlp');
const { SentimentAnalyzer } = require('node-nlp');
var fs = require('fs')

const manager = new NlpManager({ languages: ['en'],fullSearchWhenGuessed:true });




const respond=(phrase,fileName,threshold)=>{
    if (fileName===undefined){
        return new Promise((_,reject)=>reject('please provide file name'))
    }
    const exist=fs.existsSync(fileName)
    if (exist){
        manager.load(fileName)
    }else{
        
        return new Promise(
            async resolve=>{
            const sentiment = new SentimentAnalyzer({ language: 'en' });  
            const score=await sentiment.getSentiment(phrase)
            resolve(
                {
                answer:`The bot ${fileName} does not exist`,
                sentiment:score}
                )
    })
}

     return manager.process('en',phrase).then(
         data=>new Promise(resolve=>{
            
            debugger
             if (data.score>threshold && data.answer){
                //  console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
                //  console.log(data)
                resolve(data)
             }else{
                data.srcAnswer=JSON.stringify({'msg':'intentNone'})
                resolve(data) 
                
             }
        }
    )
)}

module.exports={
    'respond':respond
}
