'use strict';

module.exports = function(app) {
  var restApiRoot = app.get('restApiRoot');

  app.use(restApiRoot, app.loopback.rest());
};
