/** @fileOverview The main application. */

var http  = require('http')
  //, mongo = require('./dbs/mongo')
  , conf  = require('../config.json')
  , port  = process.env.PORT || conf.env.port || 3000
  , app   = {};

/** Global constant defining debug status. Debug is always assumed. */
global.DEBUG = typeof conf.env.dev === 'undefined' ? true : conf.env.dev;

/** Create the application server. */
app.server = http.createServer();

/**
 * Connect the application. Initialise and create the server.
 * @param {function} cb A callback function.
 */
app.configure = function (cb) {
  // Setup the databases
  // mongo.init(conf.dbs.mongo);

  app.server.listen(port);
  // (Short Circuit) if cb is a function, execute.
  typeof cb === 'function' && cb();
};

module.exports = app;

if (require.main === module)
  app.configure(function appLaunched() {
    console.log('Server running on port', port);
  });