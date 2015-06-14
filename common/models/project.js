'use strict';

var app = require('../../server/server');
var acl = require('../../server/utils/acl');
var getIds = require('../../server/utils/get-ids');

module.exports = function(Project) {
  acl.checkAccess(Project, function(currentUserId) {
    return app.models.Account.find({ where: { ownerIds: currentUserId } }).then(function(accounts) {
      if (accounts.length > 0) {
        return { accountId: { inq: getIds(accounts) } };
      }
    });
  });
};

