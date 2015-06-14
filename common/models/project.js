'use strict';

var acl = require('../../server/utils/acl');
var app = require('../../server/server');

module.exports = function(Project) {
  acl.checkAccess(Project, function(currentUserId, cb) {
    app.models.Account.find({ where: { ownerIds: currentUserId } }, function(err, accounts) {
      if (accounts.length === 0) {
        return cb({ id: null });
      }

      cb({
        accountId: {
          inq: accounts.map(function(account) {
            return account.id;
          })
        }
      });
    });
  });
};

