const { SimilarSearch } = require('node-nlp');
var thesaurus = require('thesaurus-com');
var tensify = require('tensify');
 
// 'did'


 const fun = (search_word,sentence)=>{
    var thesaurus_words = thesaurus.search(search_word).synonyms;
    thesaurus_words.push(search_word);
    thesaurus_words.forEach((word)=>{
        thesaurus_words.push(tensify(word).past)
        thesaurus_words.push(tensify(word).past_participle)
    })
    
    //thesaurus_words.push(past_words);
    var newarr = new Array();
    const op={similarWord:[]}
    var split = sentence.split(" ");

    for(var i=0;i<thesaurus_words.length;i++){
        for(var j=0;j<split.length;j++){
            var regex_thes = new RegExp(thesaurus_words[i]);
            var res = regex_thes.test(split[j]);
            //console.log(res)
            if(res===true){
                if(newarr.indexOf(split[j])=== -1){
                    op.similarWord.push(split[j])
                    newarr.push(split[j])
                }
            }
        }
    }
    
    if(op.similarWord.length==0){
        // op.similarWord = null
        //op.none = "No similar words found"
        return op
    }
    return op
}


console.log(
 fun("similar","show the related")

)





