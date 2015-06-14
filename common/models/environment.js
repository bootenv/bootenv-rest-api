'use strict';

var acl = require('../../server/utils/acl');
var app = require('../../server/server');

module.exports = function(Environment) {
  acl.checkAccess(Environment, function(currentUserId, cb) {
    app.models.Account.find({ where: { ownerIds: currentUserId } }, function(err, accounts) {
      if (accounts.length === 0) {
        return cb({ id: null });
      }

      app.models.Project.find({
        accountId: {
          inq: accounts.map(function(account) {
            return account.id;
          })
        }
      }, function(err, projects) {
        if (projects.length === 0) {
          return cb({ id: null });
        }

        cb({
          projectId: {
            inq: projects.map(function(project) {
              return project.id;
            })
          }
        });
      });
    });
  });
};

