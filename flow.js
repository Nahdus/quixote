const fs = require('fs')
// const rawdata=fs.readFileSync('./jsonfiles/friendzone.json');
const rawdata=fs.readFileSync('./jsonfiles/friendzone.json');
const flowchain = JSON.parse(rawdata);
const nextNodefinder = require('./userInputProcessor/nextnode').nextNodefinder





const state={
    index:'start'
}




// Get process.stdin as the standard input object.
var standard_input = process.stdin;

// Set input character encoding.
standard_input.setEncoding('utf-8');









// When user input data and click enter key.
// Prompt user to input data in console.
console.log(flowchain[state.index].text);
standard_input.on('data', function (data) {

   
    if(data.trim() === 'exit'){
        // Program exit.
        
        console.log("User input complete, program exit.");
        process.exit();
    }else
    {
        // find next response id based on user input in console.
        
        state['index']=nextNodefinder(flowchain[state.index],data)
        // console.log(state['index'])
        
        // for( let i=0;i<flowchain[state.index].answer.length;i++){
        //     console.log(Inputprocess(flowchain[state.index].answer[i],data))
        // }
    }
    if(state.index!=='end'){
    console.log(flowchain[state.index].text);
    }
    else{
        console.log("*********end of conversation*************");
        process.exit();
    }
});

