const  {train} = require('../trainer');
const fileName="testLayeredServiceBot.nlp"

const tainingFunction = async () =>{
    await train("greet",//IntentName
        ["Hi","Hello","hey","good morning","good evening"],//utterances
        [
            {
                "texts":["Hi, how may i help you?",'Hello, how may I help you']
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
            "betsssssssssssssssssssssss":"phoneNumber",
            "texts":["sure type your phone number"]
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
            {"betsssssssssssssssssssssss":"phoneNumber",
            "text":["dasd sure please type your phone number"]
            }
        ],//responses
        fileName//fileName
        )
}
module.exports={
    tainingFunction,
    "nlpfile":fileName
}