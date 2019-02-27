const { NlpManager, ConversationContext } = require('node-nlp');

const manager = new NlpManager({ languages: ['en'] });
const context = new ConversationContext();


manager.addDocument('en', 'Hello my name is %name%', 'greeting.hello');
manager.addDocument('en', 'I have to go', 'greeting.bye');
manager.addAnswer('en', 'greeting.hello', 'Hey there!');
manager.addAnswer('en', 'greeting.bye', 'Till next time, {{name}}!');

manager.train()
  .then(async result => {
    r = await manager.process('en', 'Hello my name is John', context)
    console.log(context)
    return r
  })
  .then(async result => {
    r = await manager.process('en', 'I have to go', context)
    console.log(context)
    return r
  })
  .then(result => {
    console.log(result.entity)
    console.log(result)
    console.log(result.answer)
  })
