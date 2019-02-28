const postit = require('./post/post')
const {respond} = require('./response')

const chatter=()=>{

    state={
        "task":"identifyIntent"
    }
    action={}
    memory={}
    const defaultResponse="sorry I couldn't understand"
    const chooseRand=(list)=>Math.round(Math.random()*((list.length)-1))
    console.log(state.task)
return {respond:(phrase,fileName,threshold)=>respond(phrase,fileName,threshold).then(data=>
    
    {
        console.log(state.task)
        switch(state.task) {
            
            case "identifyIntent":
            console.log(data.srcAnswer)
            if((JSON.parse(data.srcAnswer).hasOwnProperty('text'))){
                    
                console.log('has text')
                    
                    if((JSON.parse(data.srcAnswer)).hasOwnProperty("get")){
                        
                        state.task=(JSON.parse(data.srcAnswer)).get
                        
                    }
                    if((JSON.parse(data.srcAnswer)).hasOwnProperty("action")){
                        action={...(JSON.parse(data.srcAnswer)).action}
                       
                    }
                    
                    
                    return new Promise((resolve)=>resolve((JSON.parse(data.srcAnswer).text)[chooseRand(JSON.parse(data.srcAnswer).text)]))
                }else if(data.intent==='None'){
                    console.log('Intent not identified')
                    return new Promise((resolve)=>resolve(defaultResponse))
                }else{
                    console.log('unexpected Intent')
                    console.log(data.intent)
                }
                break;
                
             
            case "phoneNumber":
                
                console.log('Inside PhoneNumber intent')
                if(data.entities.length>0)
                {
                    data.entities.forEach(element => {
                    
                    if(element.entity==="phonenumber"){
                        
                        memory.phoneNumber=element.resolution.value
                    }
                    
                })}
                
               
                if(memory.hasOwnProperty('phoneNumber')){
                    state.task=action.ifGot.get
                    let response =undefined
                    let post = undefined
                    if (action.ifGot.hasOwnProperty('text')){
                        response = new Promise((resolve)=>resolve(action.ifGot.text[chooseRand(action.ifGot.text)]))
                    }
                    if(action.ifGot.hasOwnProperty('post')){
                        const body={}
                        body[action.ifGot.post.key]=memory.phoneNumber
                        // console.log('hehe',response)
                        post = postit(action.ifGot.post.url,body)
                        //console.log(post.then(data=>data))
                    }
                    memory={}
                    return Promise.all([response,post])
                }else{
                    state.task=action.ifGotNot.get
                    //console.log(action.ifGotNot)
                    return new Promise((resolve)=>resolve(action.ifGotNot.text[chooseRand(action.ifGotNot.text)]))
                }
                
            case "email":
                
                let response = undefined
                if(data.entities.length>0)
                {
                    data.entities.forEach(element => {
                    
                    if(element.entity==="email"){
                        
                        memory.email=element.resolution.value
                    }
                    
                })}
                
               
                if(memory.hasOwnProperty('email')){
                    if (action.ifGot.hasOwnProperty('text')){
                        
                     return new Promise((resolve)=>resolve(action.ifGot.text[chooseRand(action.ifGot.text)]))
                    }
                    
                }else{
                    if (action.ifGotNot.hasOwnProperty('text')){
                        return new Promise((resolve)=>resolve(action.ifGotNot.text[chooseRand(action.ifGotNot.text)]))
                    }
                    
                }
                
                
            default:
                return new Promise((resolve)=>resolve(null))
          }
        
        
    }
    
    ).catch(err=>new Promise((_,reject)=>reject(err)))
}}

module.exports={chatter}