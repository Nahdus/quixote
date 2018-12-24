const  {respond} = require('./respond');
const flow = require('./flow.json')


StateManager={
    currentIntent:Null
}



const flowController = (utterance,nextIntent)=>{
    respond(utterance,"testBot.nlp",0.5)
    .then(data=>{
        if(nextIntent){
            if (flow.hasOwnProperty("intro")){
                console.log(data)
            }
        }
    })

}

flowController("hello","intro")
