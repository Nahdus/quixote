
const {chatter} = require('../../chatter')
exports.respond=async (req, res,next)=> {
    //res.send(req.body);
    console.log(req.body)
    let response = await chatter(req.body.query,"testLayeredServiceBot3.nlp",'0.9');
    res.send(response);
};