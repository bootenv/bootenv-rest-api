import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds, loadIds } from '../../server/utils/get-ids';

export default function(Project) {
  acl.checkAccess(Project, (currentUserId) => {
    return app.models.Account.find({ where: { ownerIds: currentUserId } }).then((accounts) => {
      if (accounts.length > 0) {
        return { accountId: { inq: getIds(accounts) } };
      }
    });
  });

  Project.afterRemote('*', function(ctx, user, next) {
    loadIds(ctx.result, "environmentIds", app.models.Environment, "projectId")
      .then(next)
      .catch(next);
  });
}

