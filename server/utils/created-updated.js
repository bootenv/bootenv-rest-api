'use strict';

var log = require('../../server/utils/logger'),
 ipware = require('../../server/utils/ipware');

var updated = function(class_) {

  class_.observe('before save', function(context, next) {
    var now = new Date(),
        obj = context.instance || context.data,
    request = context.req,
         ip = '127.0.0.1';

    if (request) {
      try {
        ip = ipware(request).clientIp;
      } catch (ex) {
        log.error('Error getting client IP!', ex);
      }
    }

    if (context.isNewInstance) {
      obj.created = now;
      obj.createdIp = ip;
    }

    obj.lastUpdated = now;
    obj.lastUpdatedIp = ip;

    next();
  });

};

module.exports = updated;
