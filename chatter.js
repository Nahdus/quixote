const {respond} = require('./response')
state={
    "task":"identifyIntent"
}
memory={}


const chatter=(phrase,fileName,threshold)=>{
    
return respond(phrase,fileName,threshold).then(data=>
    {
        switch(state.task) {
            case "identifyIntent":
                if((JSON.parse(data.srcAnswer).hasOwnProperty('text'))){
                    const chooseRand=Math.round(Math.random()*((JSON.parse(data.srcAnswer).text.length)-1))
                    
                    if((JSON.parse(data.srcAnswer)).hasOwnProperty("get")){
                        state.task=(JSON.parse(data.srcAnswer)).get
                    }
                    
                    return new Promise((resolve)=>resolve((JSON.parse(data.srcAnswer).text)[chooseRand]))
                }else if(data.intent==='intentNone'){
                    return new Promise((resolve)=>resolve(null))
                }
                break;
                
             
            case "phoneNumber":
                memory.phoneNumber=phrase
                if(data.entities.length>0)
                {
                    data.entities.forEach(element => {
                    
                    if(element.entity==="phonenumber"){
                        //console.log(element.resolution)
                        memory.phoneNumber=element.resolution.value
                    }
                    
                })}
                return "sure type your phone number"
            default:
                return new Promise((resolve)=>resolve(null))
          }
        
        
    }
    
    ).catch(err=>new Promise((_,reject)=>reject(err)))
}

module.exports={chatter}