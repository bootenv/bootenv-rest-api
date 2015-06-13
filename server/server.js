'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var loopbackPassport = require('loopback-component-passport');
var log = require('./utils/logger');
var providers = require('./auth-providers.json');

var app = module.exports = loopback();

require('loopback-ds-ips-mixin')(app);
require('loopback-ds-timestamp-mixin')(app);
require('loopback-ds-readonly-mixin')(app);

app.use(loopback.compress());
app.use(loopback.context());

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

// The access token is only available after boot
app.use(loopback.token({
  model: app.models.accessToken,
  currentUserLiteral: 'me'
}));

// Passport configurators
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

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

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');

    log.info('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
