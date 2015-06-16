import explorer from 'loopback-explorer';
import path from 'path';

import log from '../utils/logger';

export default function(app) {
  let restApiRoot = app.get('restApiRoot');
  let explorerApp = explorer(app, {
    uiDirs: path.resolve(__dirname, '../../client'),
    basePath: restApiRoot,
    disableStackTrace: true
  });

  app.use('/explorer', explorerApp);

  app.once('started', () => {
    let baseUrl = app.get('url').replace(/\/$/, '');
    let explorerPath = explorerApp.mountpath || explorerApp.route;

    log.info('Browse your REST API at %s%s', baseUrl, explorerPath);
  });
}

