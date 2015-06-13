'use strict';

var loopback = require('loopback');
var app = require('../../server/server');

module.exports = function(Account) {
  Account.observe('before save', function addOwner(ctx, next) {
    var context = loopback.getCurrentContext();
    var currentUserId = context && context.get('accessToken').userId;

    if (ctx.instance) {
      app.models.user.findById(currentUserId, function(err, user) {
        if (!err && user) {
          ctx.instance.owners.add(user);
        }
        next();
      });
    }
  });
};

