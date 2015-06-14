'use strict';

var app = require('../../server/server');
var acl = require('../../server/utils/acl');
var getIds = require('../../server/utils/get-ids');

module.exports = function(Environment) {
  acl.checkAccess(Environment, function(currentUserId) {
    return app.models.Account.find({ where: { ownerIds: currentUserId } }).then(function(accounts) {
      if (accounts.length > 0) {
        return app.models.Project.find({ accountId: { inq: getIds(accounts) } }).then(function(projects) {
          if (projects.length > 0) {
            return { projectId: { inq: getIds(projects) } };
          }
        });
      }
    });
  });
};

