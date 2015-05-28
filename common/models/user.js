'use strict';

var log   = require('../../server/utils/logger'),
    ipware = require('../../server/utils/ipware');

module.exports = function (user) {

  user.observe('before save', function (context, next) {
    var now     = new Date(),
        user    = context.instance || context.data,
        request = context.req,
        ip      = '127.0.0.1';

    if (request) {
      try {
        ip = ipware(request).clientIp;
      } catch (ex) {
        log.error('Error getting client IP!', ex);
      }
    }

    if (context.isNewInstance) {
      user.created = now;
      user.createdIp = ip;
    }
    user.lastUpdated = now;
    user.lastUpdatedIp = ip;

    next();
  });

};
