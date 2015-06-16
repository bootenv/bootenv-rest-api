import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds, loadIds } from '../../server/utils/get-ids';

function getFilter(results) {
  return !!results.length && { projectId: { inq: getIds(results) } };
}

export default function(Environment) {
  acl.checkAccess(Environment, () => app.models.Project.find().then(getFilter));

  Environment.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'tokenIds', app.models.EnvironmentToken, 'environmentId')
      .then(next)
      .catch(next));
}

