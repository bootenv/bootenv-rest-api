'use strict';

module.exports = function(app) {
  var loopback = app.loopback;
  var router = loopback.Router();

  router.get('/', loopback.status());

  app.use(router);
};
