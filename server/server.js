import loopback from 'loopback';
import boot from 'loopback-boot';
import ips from 'loopback-ds-ips-mixin';
import timestamp from 'loopback-ds-timestamp-mixin';
import readonly from 'loopback-ds-readonly-mixin';

import setupPassport from './passport';
import log from './utils/logger';
import { printBanner } from './utils/print-logo';

let app = loopback();

ips(app);
timestamp(app);
readonly(app);

app.use(loopback.compress());
app.use(loopback.context());

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

setupPassport(app);

app.start = () => app.listen(() => {
  app.emit('started');
  printBanner();
  log.info('Web server listening at: %s', app.get('url'));
});

export default app;

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}

