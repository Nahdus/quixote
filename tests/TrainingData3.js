const  {train} = require('../trainer');
const fileName="testLayeredServiceBot3.nlp"

const tainingFunction = async () =>{
    await train("intro",//IntentName
        ["Hi","Hello","hey","good morning","good evening"],//utterances
        [
            {   "get":"identifyIntent",
                "text":["Hi, how may i help you?",'Hello, how may I help you']
                }
        ],//responses
        fileName//fileName
        )
    await train("accountBalance",//IntentName
    ["what is my talk time balance",
    "how much is my balance",
    "how much balance is left in my account",
    "what is my account balance"],//utterances
        [
            {
            "get":"phoneNumber",
            "text":["sure please type your phone number"],
            "action":{"ifGot":{"text":["Thanks for confirming"],
                       "post":{"url":"http://localhost:1234/phonebalance/balance","key":'phonenumber'} ,
                       "get":"identifyIntent"
                    },
            "ifGotNot":{"text":["I couldnt get your phone nummber could you type again?"],
                        "get":"phoneNumber"},
            }}
            ],//responses
            fileName//fileName
        )
    
        // await train("phonenumberintent",//IntentName
        // ["phone number"],//utterances
        // [
        //     {
        //         "get":"identifyIntent",

        //     }
        // ],//responses
        // fileName//fileName
        // )
}

if (require.main === module) {
    tainingFunction();
}

module.exports={
    tainingFunction,
    "nlpfile":fileName
}