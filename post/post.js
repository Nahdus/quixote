var request = require('request');


const sendRequest=(url,body)=>{
    var options = {
        url: url,
        method: 'POST',
        json: true,
        body: body
        }
    // console.log(options)
        
        
        
    return new Promise(function(resolve, reject){
    request(options,function (error, response, body) {
        
        if (!error && response.statusCode === 200) {
            
            // Print out the response body
            // console.log("fromPost",body)
            
            resolve(body)
        }
        else if (error||response.statusCode !== 200){
            //debugger;
            console.log("something went wrong")
            console.log('error '+error)
            console.log('response '+response)
            
            reject(body)
            
        }
        
    })})
    
}

module.exports = sendRequest








