import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds, loadIds } from '../../server/utils/get-ids';

export default function(Environment) {
  acl.checkAccess(Environment, (currentUserId) => {
    return app.models.Account.find({ where: { ownerIds: currentUserId } }).then((accounts) => {
      if (accounts.length > 0) {
        return app.models.Project.find({ accountId: { inq: getIds(accounts) } }).then((projects) => {
          if (projects.length > 0) {
            return { projectId: { inq: getIds(projects) } };
          }
        });
      }
    });
  });

  Environment.afterRemote('*', function(ctx, user, next) {
    loadIds(ctx.result, "tokenIds", app.models.EnvironmentToken, "environmentId")
      .then(next)
      .catch(next);
  });
}

