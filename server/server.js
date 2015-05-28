'use strict';

var loopback = require('loopback'),
    boot     = require('loopback-boot'),
    log      = require('./utils/logger');

var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// attempt to build the providers/passport config
var providers = {};
try {
  providers = require('./auth-providers.json');
} catch (error) {
  log.error('Error init passport!', error);

  process.exit(1);
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

// The access token is only available after boot
app.use(loopback.token({
  model: app.models.accessToken
}));

passportConfigurator.init();

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});

for (var provider in providers) {
  var config = providers[provider];

  config.session = config.session !== false;
  passportConfigurator.configureProvider(provider, config);
}

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');

    log.info('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
