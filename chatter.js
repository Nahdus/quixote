const postit = require('./post/post')
const {respond} = require('./response')

/**
 *@param  {string} defaultResponse response that needs to be returned not unknown intent
 */
const chatter=(defaultResponse)=>{

    const state={
        "task":"identifyIntent"
    }
    let action={}
    let memory={}
    let defRes=defaultResponse
    
    const chooseRand=(list)=>Math.round(Math.random()*((list.length)-1))
    
/**
 * @param  {string} phrase
 * @param  {string} fileName
 * @param  {number} threshold numb
 * number between 0 and 1 eg 1,0.9,0.7 Nlp confidence score
 * falls below treshold it will return intentNone
 
 */
return {respond:(phrase,fileName,threshold)=>respond(phrase,fileName,threshold).then(data=>
    
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
                }else if(data.intent==='None'){
                    
                    if(defRes!==undefined){

                        return new Promise((resolve)=>resolve(defRes))
                    }
                    else{
                        return null
                    }
                }else{
                    console.log('unexpected Intent')
                    console.log(data.intent)
                }
                break;
                
             
            case "phoneNumber":
                
                
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