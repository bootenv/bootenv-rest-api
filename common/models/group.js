import app from '../../server/server';
import acl from '../../server/utils/acl';
import { getIds } from '../../server/utils/get-ids';

function getFilter(results) {
  return !!results.length && { accountId: { inq: getIds(results) } };
}

export default function(Group) {
  acl.checkAccess(Group, () => app.models.Account.find().then(getFilter));
}

