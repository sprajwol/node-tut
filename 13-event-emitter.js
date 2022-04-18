const EventEmitter = require('events');
 
const customEmitter = new EventEmitter()

customEmitter.on('response', (name, id) => {
    console.log(`data received user ${name} with id:${id}`)
})
customEmitter.on('response', () => {
    console.log(`come other logic here`)
})

customEmitter.emit('response', 'john', 34)