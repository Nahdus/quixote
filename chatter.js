const {respond} = require('./response')
state={
    "task":"identifyIntent"
}
actions={}
memory={}

const chooseRand=(list)=>Math.round(Math.random()*((list.length)-1))
const chatter=(phrase,fileName,threshold)=>{
    
return respond(phrase,fileName,threshold).then(data=>
    {
        switch(state.task) {
            case "identifyIntent":
                if((JSON.parse(data.srcAnswer).hasOwnProperty('text'))){
                    
                    
                    
                    if((JSON.parse(data.srcAnswer)).hasOwnProperty("get")){
                        state.task=(JSON.parse(data.srcAnswer)).get
                    }
                    if((JSON.parse(data.srcAnswer)).hasOwnProperty("action")){
                        action={...(JSON.parse(data.srcAnswer)).action}
                       
                    }
                    
                    
                    return new Promise((resolve)=>resolve((JSON.parse(data.srcAnswer).text)[chooseRand(JSON.parse(data.srcAnswer).text)]))
                }else if(data.intent==='intentNone'){
                    
                    return new Promise((resolve)=>resolve(null))
                }
                break;
                
             
            case "phoneNumber":
                
                //memory.phoneNumber=phrase
                if(data.entities.length>0)
                {
                    data.entities.forEach(element => {
                    
                    if(element.entity==="phonenumber"){
                        
                        memory.phoneNumber=element.resolution.value
                    }
                    
                })}
                
               
                if(memory.hasOwnProperty('phoneNumber')){
                    
                    //console.log(memory.phoneNumber)
                    return action.ifGot[chooseRand(action.ifGot)]
                }else{
                    //console.log(action.ifGotNot)
                    return action.ifGotNot[chooseRand(action.ifGotNot)]
                }
            case "email":
                
                //memory.phoneNumber=phrase
                if(data.entities.length>0)
                {
                    data.entities.forEach(element => {
                    
                    if(element.entity==="email"){
                        
                        memory.email=element.resolution.value
                    }
                    
                })}
                
               
                if(memory.hasOwnProperty('email')){
                    
                    console.log(memory.email)
                    return action.ifGot[chooseRand(action.ifGot)]
                }else{
                    console.log(data.ifGotNot)
                    return action.ifGotNot[chooseRand(action.ifGotNot)]
                }
                
                
            default:
                return new Promise((resolve)=>resolve(null))
          }
        
        
    }
    
    ).catch(err=>new Promise((_,reject)=>reject(err)))
}

module.exports={chatter}