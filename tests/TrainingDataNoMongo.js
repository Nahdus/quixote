const  {train} = require('../trainer');
const fileName="testLayeredServiceBot4.nlp"

const tainingFunction = async () =>{
    await train("introduction",//IntentName
        ["Hi","Hello","hey","good morning","good evening"],//utterances
        [
            {   "get":"identifyIntent",
                "text":["Hi how are you",'hello nice to meet you, how are you']
                }
        ],//responses
        fileName//fileName
        )
    await train("acknowledgePositive",//IntentName
    ["great",
    "I am doing good",
    "I am having fun",
    "I am fine",
    "all good"],//utterances
        [
            {
            "get":"identifyIntent",
            "text":["great to hear","good to know"],
            
        }
            ],//responses
            fileName//fileName
        )
        await train("acknowledgeNegative",//IntentName
        ["great",
        "I am sad",
        "I am lonely",
        "I am alone",
        "I need a girlfriend"],//utterances
            [
                {
                "get":"identifyIntent",
                "text":["dont feel bad","dont feel bad ,Not everything happens for a reason; we claim that it does for a reason: to console ourselves."],
                
            }
                ],//responses
                fileName//fileName
            )
            await train("Time",//IntentName
        ["Are you free",
        "Do you have time",
        "Is this a good time to talk to you",
        "shall we talk",
        "I want to talk to you"],//utterances
            [
                {
                "get":"identifyIntent",
                "text":["Sure lets talk","No i am busy right now"]
                
            }
                ],//responses
                fileName//fileName
            )
            await train("Time",//IntentName
        ["Are you free",
        "Do you have time",
        "Is this a good time to talk to you",
        "shall we talk",
        "I want to talk to you"],//utterances
            [
                {
                "get":"identifyIntent",
                "text":["Sure lets talk","No i am busy right now"]
                
            }
                ],//responses
                fileName//fileName
            )
            
        
        }
if (require.main === module) {
    tainingFunction();
}

module.exports={
    tainingFunction,
    "nlpfile":fileName
}