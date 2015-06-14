import loopback from 'loopback';
import boot from 'loopback-boot';
import loopbackPassport from 'loopback-component-passport';
import log from './utils/logger';
import providers from './auth-providers.json';

import ips from 'loopback-ds-ips-mixin';
import timestamp from 'loopback-ds-timestamp-mixin';
import readonly from 'loopback-ds-readonly-mixin';

var app = loopback();

ips(app);
timestamp(app);
readonly(app);

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
  if (providers.hasOwnProperty(provider)) {
    var config = providers[provider];

    config.session = config.session !== false;
    passportConfigurator.configureProvider(provider, config);
  }
}

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');

    log.info('Web server listening at: %s', app.get('url'));
  });
};

export default app;

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
