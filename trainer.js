const { NlpManager } = require('node-nlp');
var fs = require('fs')

const manager = new NlpManager({ languages: ['en'] });


const train =   (intentname,utterances,responses,fileName)=>{
    //manager.load(fileName).then().catch()
    return new Promise( async resolve=>{
    const exist=fs.existsSync(fileName)
    console.log(exist)
    if (exist){
        manager.load(fileName)
    }
    utterances.forEach(item=> {
        manager.addDocument('en', item, intentname)
        })
    responses.forEach(item=> {
        manager.addAnswer('en',intentname,item)
        })
    await manager.train() 
    manager.save(fileName,fileName)
    // const test=manager.export(false)
    resolve()
        })
    }




module.exports={
    'train':train
}

