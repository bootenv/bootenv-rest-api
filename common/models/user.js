import app from '../../server/server';
import { loadIds } from '../../server/utils/get-ids';

const allMethods = ['__count__', '__get__', '__create__', '__delete__', '__destroyById__',
  '__findById__', '__getById__', '__updateById__'];

function disableRemoteRelationship(model, relationship) {
  for (let method of allMethods) {
    model.disableRemoteMethod(method + relationship, false);
  }
}

export default function(user) {
  user.disableRemoteMethod('count', true);
  user.disableRemoteMethod('find', true);
  user.disableRemoteMethod('findOne', true);
  user.disableRemoteMethod('deleteById', true);

  disableRemoteRelationship(user, 'accessTokens');
  disableRemoteRelationship(user, 'credentials');
  disableRemoteRelationship(user, 'identities');
  disableRemoteRelationship(user, 'personalAccount');

  // TODO add here too the accounts that the user has read access
  user.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'accountIds', app.models.Account, 'ownerIds')
      .then(next)
      .catch(next));
}

