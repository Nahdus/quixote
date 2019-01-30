const  {train} = require('../trainer');
const fileName="testLayeredServiceBot.nlp"
const tainingFunction = async () =>{
    await train("intro",//IntentName
 ["Hello","Hi","How are you","howdy","wassup"],//utterances
 [{"text":["Hi happy to see you today"]}],//responses
 fileName//fileName
 )
    await train("helpCar",//IntentName
 ["help me find my car","need your help finding my car","can you help me finding my car"],//utterances
 [{"text":["sure can you give me your car number"]}],//responses
 fileName//fileName
 )
    await train("helplicence",//IntentName
 ["can you tell me when my car licence is expiring",
 "need your help finding my car's licence expiration date",
 "when is my licence expiring"],//utterances
 [{"text":["sure can you give me your car registartion number"]}],//responses
 fileName//fileName
 )
  }

module.exports={
    tainingFunction,
    "nlpfile":fileName
}