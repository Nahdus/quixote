const {respond} = require('./response')


state={
    "task":"identifyIntent"
}
const chatter=(phrase,fileName,threshold)=>{
return respond(phrase,fileName,threshold).then(data=>
    {
        if(data.intent!=="None" && state.task==="identifyIntent"){
                const chooseRand=Math.round(Math.random()*((JSON.parse(data.srcAnswer).text.length)-1))
                console.log(data)
                return new Promise((resolve)=>resolve(JSON.parse(data.srcAnswer).text)[chooseRand])
        }
        else{
                return new Promise((resolve)=>resolve(null))
        }
        
    }
    
    ).catch(err=>new Promise((_,reject)=>reject(err)))
}

module.exports={chatter}