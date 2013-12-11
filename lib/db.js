var db = module.exports = {

  messages: [
    'This is message 1',
    'this is message 2',
    'this is message 3',
    'this is message 4',
    'this is message 5'
    ],

  generateRandom: function () {
    return db.messages[Math.floor(Math.random() * db.messages.length)];
  }

}