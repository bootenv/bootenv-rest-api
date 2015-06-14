import loopback from 'loopback';
import app from '../../server/server';
import acl from '../../server/utils/acl';

export default function(Account) {
  acl.checkAccess(Account, (currentUserId) => {
    return Promise.resolve({ ownerIds: currentUserId });
  });

  Account.observe('before save', function addOwner(ctx, next) {
    let context = loopback.getCurrentContext();
    let accessToken = context && context.get('accessToken');

    if (accessToken && ctx.instance) {
      app.models.user.findById(accessToken.userId).then((user) => {
        ctx.instance.owners.add(user);
        next();
      }).catch(next);
    } else {
      next();
    }
  });
}

