const  {train} = require('../trainer');
const fileName="testLayeredServiceBot3.nlp"

const tainingFunction = async () =>{
    await train("intro",//IntentName
        ["Hi","Hello","hey","good morning","good evening"],//utterances
        [
            {
                "text":["Hi, how may i help you?",'Hello, how may I help you']
                }
        ],//responses
        fileName//fileName
        )
    await train("planExpiry",//IntentName
        ["When is my paln expiring",
        "when is my service scheme expiring",
        "when is expiration date of my plan",
        "last date of expiration of my number"],//utterances
        [
            {
            "get":"phoneNumber",
            "text":["sure type your phone number"]
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
            {"get":"phoneNumber",
            "text":["dasd sure please type your phone number"]
            }
        ],//responses
        fileName//fileName
        )
}

tainingFunction()
module.exports={
    tainingFunction,
    "nlpfile":fileName
}