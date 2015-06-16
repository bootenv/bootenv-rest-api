import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds, loadIds } from '../../server/utils/get-ids';

function getFilter(results) {
  return !!results.length && { accountId: { inq: getIds(results) } };
}

export default function(Project) {
  acl.checkAccess(Project, () => app.models.Account.find().then(getFilter));

  Project.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'environmentIds', app.models.Environment, 'projectId')
      .then(next)
      .catch(next));
}

