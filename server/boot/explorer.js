'use strict';

var environment = require('../utils/environment');
var path = require('path');
var log = require('../utils/logger');

module.exports = function(app) {
  if (environment.isDev()) {
    try {
      var explorer = require('loopback-explorer');
      var restApiRoot = app.get('restApiRoot');

      var explorerApp = explorer(app, {
        uiDirs: path.resolve(__dirname, '../../client'),
        basePath: restApiRoot,
        disableStackTrace: true
      });

      app.use('/explorer', explorerApp);
      app.once('started', function() {
        var baseUrl = app.get('url').replace(/\/$/, '');
        var explorerPath = explorerApp.mountpath || explorerApp.route;

        log.info('Browse your REST API at %s%s', baseUrl, explorerPath);
      });
    } catch (error) {
      log.error('Run `npm install loopback-explorer` to enable the LoopBack explorer');
    }
  }
};
