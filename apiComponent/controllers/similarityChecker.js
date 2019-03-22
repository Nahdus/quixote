const { SimilarSearch } = require('node-nlp');
var thesaurus = require('thesaurus-com');


 const fun = (search_word,sentence)=>{
    var thesaurus_words = thesaurus.search(search_word).synonyms;
    thesaurus_words.push(search_word);
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
 fun("hope"," trust hope on yourself")

)





//    readline.question(`Enter the word to be searched in your text\n`, (search_word) => {
//    //console.log("Search word: ", search_word);
//    var thesaurus_words = thesaurus.search(search_word).synonyms;
//    thesaurus_words.push(search_word);
//    var newarr = new Array();
//    //console.log("Similar words : ", thesaurus_words );
//    readline.question(`Enter the sentence for performing similarity check\n`, (sentence) => {
//        console.log("Sentence: ", sentence);
//        var split = sentence.split(" ");
//        //console.log(split);

//        for(var i=0;i<thesaurus_words.length;i++){
//            for(var j=0;j<split.length;j++){
//                var regex_thes = new RegExp(thesaurus_words[i]);
//                //console.log(regex_thes);
//                var res = regex_thes.test(split[j]);
//                //console.log(res)
//                if(res==true){
//                    console.log("Similar word to "+search_word+ " is "+split[j] );
//                    newarr.push(split[j]);
//                }
//                else{
//                    const similar = new SimilarSearch({ normalize: true });
//                    var val = similar.getSimilarity(thesaurus_words[i], split[j]);
//                    if(val <2){
//                        console.log("Almost similar word is", split[j]);
//                        newarr.push(split[j]);
//                    }

//                }

//            }
//        }
//     //    if(newarr.length==0){
//     //        console.log("No similar words for "+search_word+" found");
//     //    }
//  })



//  })
