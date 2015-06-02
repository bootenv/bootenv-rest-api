'use strict';

var log = require('../../server/utils/logger'),
  debug = log.debug,
 ipware = require('ipware');

function ipsMixin(Model, options) {
  debug('IPs mixin for Model %s', Model.modelName);

  var createdByIp = options.createdByIp || 'createdByIp';
  var updatedByIp = options.updatedByIp || 'updatedByIp';
  var required = options.required === undefined ? true : options.required;

  debug('createdByIp', createdByIp, options.createdByIp);
  debug('updatedByIp', updatedByIp, options.updatedByIp);

  Model.defineProperty(createdByIp, {type: String, required: required});
  Model.defineProperty(updatedByIp, {type: String, required: required});

  Model.observe('before save', function event(ctx, next) {
    debug('ctx.options', ctx.options);

    if (ctx.options && ctx.options.skipUpdatedByIp) {
      return next();
    }

    var request = ctx.req,
             ip = '127.0.0.1';

    if (request) {
      try {
        ip = ipware().get_ip(request).clientIp; // jshint ignore:line
      } catch (ex) {
        log.error('Error getting client IP!', ex);
      }
    }

    if (ctx.isNewInstance) {
      ctx.instance[createdByIp] = ip;
    }

    if (ctx.instance) {
      debug('%s.%s before save: %s', ctx.Model.modelName, updatedByIp, ctx.instance.id);
      ctx.instance[updatedByIp] = ip;
    } else {
      debug('%s.%s before update matching %j', ctx.Model.pluralModelName, updatedByIp, ctx.where);
      ctx.data[updatedByIp] = ip;
    }
    next();
  });

}

module.exports = function mixin(app) {
  app.loopback.modelBuilder.mixins.define('Ips', ipsMixin);
};
