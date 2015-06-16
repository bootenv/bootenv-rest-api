import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds } from '../../server/utils/get-ids';

function getFilter(results) {
  return !!results.length && { environmentId: { inq: getIds(results) } };
}

export default function(EnvironmentToken) {
  acl.checkAccess(EnvironmentToken, () => app.models.Environment.find().then(getFilter));
}

