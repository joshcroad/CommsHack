// Twilio Credentials 
var ACCOUNT_SID     = 'account_sid'
  , AUTH_TOKEN      = 'auth_token'
  , ACCOUNT_NUMBER  = '+441234567890';

//require the Twilio module and create a REST client
var cli = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);

var twilio = module.exports = {

  message: {

    send: function (params) {
      var p = {
        to: params.to,
        from: ACCOUNT_NUMBER,
        body: params.body
      }

      cli.sms.messages.post(p, function(err, res) {
        if (err)
          return console.log(err)
        return console.log(res.body);
      });
    }

  },

  call: {

    outgoing: function (params) {
      params.message = params.message.replace(/ /g, '-');
      cli.calls.post({
          to: params.to,
          from: ACCOUNT_NUMBER,
          url: 'http://chatroapp.com:3000/twiml/' + params.message
      }, function(err, res) {
        if (err)
          return console.log(err);
        return console.log('done');
      });
    }

  }

};