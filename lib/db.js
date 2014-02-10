/**
 * Holder database file, no database setup for hack day.
 */

var db = module.exports = {

  messages: [
    'My milkshake brings all the boys to the yard. I need some help, there are too many.',
    'Your cat is stuck up a tree. You best come home.',
    'You\'re nan is stuck on the stair lift again'
    ],

  generateRandom: function () {
    return db.messages[Math.floor(Math.random() * db.messages.length)];
  }

}