export default function(app) {
  app.models.Role.registerResolver('accountOwner', function(role, ctx, cb) {
    if (ctx.modelName !== 'Account') {
      return cb(null, false);
    }

    var currentUserId = ctx.accessToken.userId;

    if (!currentUserId) {
      return cb(null, false);
    }

    if (ctx.modelId) {
      ctx.model.findById(ctx.modelId).then((account) => {
        if (!account) {
          cb(true);
        } else {
          var ids = account.ownerIds.map(id => id.toString());

          cb(null, ids.indexOf(currentUserId.toString()) > -1);
        }
      }).catch(cb);
    }
  });
}

