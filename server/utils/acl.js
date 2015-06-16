import loopback from 'loopback';

export default {

  checkAccess(model, filter) {
    model.observe('access', function limitToOwners(ctx, next) {
      let context = loopback.getCurrentContext();
      let accessToken = context && context.get('accessToken');

      if (!accessToken) {
        return next();
      }

      filter(accessToken.userId).then(where => {
        if (where && ctx.query.where) {
          ctx.query.where = { and: [ctx.query.where, where] };
        } else {
          ctx.query.where = where || { id: null };
        }

        next();
      }).catch(next);
    });
  }

};

