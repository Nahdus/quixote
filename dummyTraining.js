
const {train} = require('./trainer')

const trainServiceBot=async ()=>{
await train("greet",//IntentName
     ["Hi","Hello","hey","good morning","good evening"],//utterances
     [
         {
             "texts":["Hi, how may i help you?",'Hello, how may I help you']
            }
    ],//responses
     "testLayeredServiceBot.nlp"//fileName
     )
await train("planExpiry",//IntentName
     ["When is my paln expiring",
     "when is my service scheme expiring",
     "when is expiration date of my plan",
    "last date of expiration of my number"],//utterances
     [
         {
        "get":"phoneNumber",
        "texts":["sure type your phone number"]
        }
        ],//responses
     "testLayeredServiceBot.nlp"//fileName
     )
await train("accountBalance",//IntentName
     ["what is my talk time balance",
     "how much is my balance",
     "how much balance is left in my account",
    "what is my account balance"],//utterances
     [
         {"get":"phoneNumber",
        "text":["sure please type your phone number"]
        }
    ],//responses
     "testLayeredServiceBot.nlp"//fileName
     )
}
trainServiceBot()