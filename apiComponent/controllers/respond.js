
const {chatter} = require('../../chatter')
//const bot =chatter("Sorry I couldnn't get you")
exports.respond=async (req, res,next)=> {
   try{
    const bot =chatter("Sorry I couldnn't get you")
       console.log(req.body)
       let response = await bot.respond(req.body.query,"testLayeredServiceBot3.nlp",'0.9');
       res.send(response);
   }catch(err){
       next(err)
   }
};