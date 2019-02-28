
const {chatter} = require('../../chatter')
const bot =chatter()
exports.respond=async (req, res,next)=> {
   try{

       console.log(req.body)
       let response = await bot.respond(req.body.query,"testLayeredServiceBot3.nlp",'0.9');
       res.send(response);
   }catch(err){
       next(err)
   }
};