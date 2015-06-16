import loopback from 'loopback';
import app from '../../server/server';
import acl from '../../server/utils/acl';
import { loadIds } from '../../server/utils/get-ids';

export default function(Account) {
  acl.checkAccess(Account, userId => Promise.resolve({ ownerIds: userId }));

  Account.observe('before save', (ctx, next) => {
    let context = loopback.getCurrentContext();
    let accessToken = context && context.get('accessToken');

    if (accessToken && ctx.instance) {
      app.models.user.findById(accessToken.userId)
        .then(user => {
          ctx.instance.owners.add(user);
          next();
        }).catch(next);
    } else {
      next();
    }
  });

  Account.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'projectIds', app.models.Project, 'accountId')
      .then(next)
      .catch(next));
}

