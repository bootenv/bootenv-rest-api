import loopback from 'loopback';

export default {

  checkAccess(model, filter) {
    model.observe('access', function limitToOwners(ctx, next) {
      var context = loopback.getCurrentContext();
      var accessToken = context && context.get('accessToken');

      if (accessToken) {
        filter(accessToken.userId).then((where) => {
          if (where && ctx.query.where) {
            ctx.query.where = { and: [ctx.query.where, where] };
          } else {
            ctx.query.where = where || { id: null };
          }

          next();
        }).catch(next);
      } else {
        next();
      }
    });
  }

};
