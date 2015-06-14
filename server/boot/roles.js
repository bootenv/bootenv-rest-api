'use strict';

module.exports = function(app) {

  app.models.Role.registerResolver('accountOwner', function(role, ctx, cb) {
    if (ctx.modelName !== 'Account') {
      return cb(null, false);
    }

    var currentUserId = ctx.accessToken.userId;

    if (!currentUserId) {
      return cb(null, false);
    }

    if (ctx.modelId) {
      ctx.model.findById(ctx.modelId, function(err, account) {
        if (err || !account) {
          cb(err);
        } else {
          var ids = account.ownerIds.map(function(id) {
            return id.toString();
          });

          cb(null, ids.indexOf(currentUserId.toString()) > -1);
        }
      });
    }
  });

};
