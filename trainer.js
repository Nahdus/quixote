const { NlpManager } = require('node-nlp');
const fs = require('fs')
const to =require('./to/to').to

const manager = new NlpManager({ languages: ['en'] });


const train =   (intentname,utterances,response,fileName)=>{
    //manager.load(fileName).then().catch()
    return new Promise( async (resolve,reject)=>{
    const exist=fs.existsSync(fileName)
    
    if (exist){
        manager.load(fileName)
    
    }
    utterances.forEach(item=> {
        manager.addDocument('en', item, intentname)
        })
    response.forEach((response)=>{
        manager.addAnswer('en',intentname,JSON.stringify(response))
    })
        
        
        try{
            await to(manager.train())
        }catch(e){
            reject(e)
        }
         
    
    try{
        manager.save(fileName,fileName)
    }catch(e){
        reject(e)
        }
    resolve('success')
        })
    }

module.exports={
    'train':train
}

