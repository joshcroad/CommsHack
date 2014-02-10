var express  = require('express'),
    app      = express(),
    db       = require('./db'),
    twilio   = require('./twilio'),
    config   = require('../config.json'),
    port     = process.env.PORT || config.port || 3000,
    globalMessage  = null;

// Set version (taken from package.json).
app.set('version', require('../package').version);

// Set layout engine options (Jade).
app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

// Ensures rendered HTML is not compressed.
app.locals.pretty = true;

/**
 * Initialise the app, configuring middleware and starting the server. As
 * previously stated, this is 'where the shiz starts to happen'.
 *
 * @param {function} callback A callback function to be called.
 */
app.connect = function (cb) {

  // Configure Express.
  app.configure(function () {
    // Initialise middleware.
    app.use(express.compress());
    app.use(express.cookieParser(app.set('session secret')));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieSession({
      key: 'commshack',
      secret: 'secret_twilio_key',
      maxAge: 86400000
    }));
    app.use('/public', express.static(__dirname + '/../public', {
      maxAge: 86400000
    }));
    app.use(app.router);
    app.use(function (err, req, res, next) {
      res.json(err.stack);
    });

    // Define all of the routes.
    // Homepage view
    app.get('/', function (req, res, next) {
      res.render('index');
    });

    // User login
    app.post('/twiml/*', function (req, res, next) {
      var xml = '<?xml version="1.0" encoding="UTF-8" ?><Response><Pause length="1"/><Say voice="woman" language="en-gb">' + req.params + '</Say></Response>';
      res.writeHead(200, {"Content-Type": "application/xml"});
      res.write(xml);
      res.end();
    });

    app.post('/request', function (req, res, next) {
      var delay = req.body.time * 60000,
          to = req.body.to,
          isChecked = req.body.isChecked;
      globalMessage = isChecked ? db.generateRandom() : req.body.message;

      setTimeout(function () {
        twilio.call.outgoing({
          to: to,
          message: globalMessage
        }, function (err, res) {
          if (err)
            return console.log(err)
          return console.log('calling');
        });
      }, delay);
    });

  });

  // Start the server.
  module.exports.listen(port);

  // Call callback (if passed), usually a confirmation console log.
  if (typeof cb === 'function') cb();

};

module.exports = app;

// Only run the server when the file is called directly.
if (require.main === module)
  app.connect(function () {
    // Log verification that server has started.
    console.log('working');
  });
