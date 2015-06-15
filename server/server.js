import loopback from 'loopback';
import boot from 'loopback-boot';
import loopbackPassport from 'loopback-component-passport';
import ips from 'loopback-ds-ips-mixin';
import timestamp from 'loopback-ds-timestamp-mixin';
import readonly from 'loopback-ds-readonly-mixin';
import figlet from 'figlet'
import ansi from 'ansi'

import log from './utils/logger';
import providers from './auth-providers.json';

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
  return app.listen(() => {
    app.emit('started');

    console.log('');

    let bootenv = ' '.repeat(80) + '\n' +
      figlet.textSync('>bootenv', { font: 'DOS Rebel' }).replace(/\n *$/, '');
    let cursor = ansi(process.stdout);
    let regExp = /(.{10})(.*)(.{32})\n/g;

    let match;
    while (match = regExp.exec(bootenv)) {
      cursor
        .green().write(match[1])
        .white().bg.reset().write(match[2] + ' ')
        .black().bg.green().write(match[3] + ' ')
        .reset().bg.reset().write('\n');
    }

    console.log(figlet.textSync(' '.repeat(8) + 'Rest API', { font: 'JS Stick Letters' }));
    console.log('');

    log.info('Web server listening at: %s', app.get('url'));
  });
};

export default app;

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
