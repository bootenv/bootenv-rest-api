'use strict';

var loopback = require('loopback');
var app = require('../../server/server');
var acl = require('../../server/utils/acl');

module.exports = function(Account) {
  acl.checkAccess(Account, function(currentUserId, cb) {
    cb({ ownerIds: currentUserId });
  });

  Account.observe('before save', function addOwner(ctx, next) {
    let context = loopback.getCurrentContext();
    let accessToken = context && context.get('accessToken');

    if (accessToken && ctx.instance) {
      app.models.user.findById(accessToken.userId, function(err, user) {
        if (!err && user) {
          ctx.instance.owners.add(user);
        }

        next();
      });
    } else {
      next();
    }
  });
};

