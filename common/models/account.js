'use strict';

var createdUpdated = require('../../server/utils/created-updated');

module.exports = function(Account) {

  // Update updatedBy and family
  createdUpdated(Account);

  // When creating, add the current user to the owners
  Account.observe('before save', function(context, next) {
    if (ctx.isNewInstance) {
      app.models.user.findById(context.req.accessToken.userId, function(err, user) {
        if (err) {
          return next(err);
        }

        if (!user) {
          return next(new Error('could not find the given user'));
        }

        var account = context.instance || context.data;

        account.owners.add(user);

        next();
      });
    } else {
      next();
    }
  });

};
