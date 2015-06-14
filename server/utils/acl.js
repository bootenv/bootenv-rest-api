'use strict';

var loopback = require('loopback');
var app = require('../../server/server');

module.exports = {

  checkAccess(model, filter) {
    model.observe('access', function limitToOwners(ctx, next) {
      var context = loopback.getCurrentContext();
      var accessToken = context && context.get('accessToken');

      if (accessToken) {
        filter(accessToken.userId, function(where) {
          if (!where) {
            return next();
          }

          if (ctx.query.where) {
            ctx.query.where = { and: [ctx.query.where, where] };
          } else {
            ctx.query.where = where;
          }

          next();
        });
      } else {
        next();
      }
    });
  }

};
