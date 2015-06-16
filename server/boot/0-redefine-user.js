import { loadIds } from '../../server/utils/get-ids';

const allMethods = ['__count__', '__get__', '__create__', '__delete__', '__destroyById__',
  '__findById__', '__getById__', '__updateById__'];

function disableRemoteRelationship(model, relationship) {
  for (let method of allMethods) {
    model.disableRemoteMethod(method + relationship, false);
  }
}

export default function(app) {
  var User = app.models.User;

  User.plural = 'users';
  User.http.path = 'users';

  app.models.User.settings.mongodb = { collection: 'users' };
  app.models.AccessToken.settings.mongodb = { collection: 'accessTokens' };
  app.models.UserCredential.settings.mongodb = { collection: 'userCredentials' };
  app.models.UserIdentity.settings.mongodb = { collection: 'userIdentities' };

  User.mixin('Timestamp', {
    createdAt: 'created',
    updatedAt: 'lastUpdated',
    required: false
  });

  User.mixin('IPs', {
    createdByIp: 'createdIp',
    updatedByIp: 'lastUpdatedIp',
    required: false
  });

  User.defineProperty('fullName', { type: 'string' });
  User.defineProperty('language', { type: 'string' });

  User.hasMany(app.models.Account, { as: 'personalAccount' });

  User.settings.acls = [
    {
      'accessType': '*',
      'principalType': 'ROLE',
      'principalId': '$unauthenticated',
      'permission': 'DENY'
    },
    {
      'accessType': '*',
      'principalType': 'ROLE',
      'principalId': '$owner',
      'permission': 'ALLOW'
    }
  ];

  User.hidden = [
    'emailVerified',
    'verificationToken',
    'accessTokens',
    'credentials',
    'challenges',
    'identities',
    'realm',
    'status'
  ];

  User.disableRemoteMethod('count', true);
  User.disableRemoteMethod('find', true);
  User.disableRemoteMethod('findOne', true);
  User.disableRemoteMethod('deleteById', true);

  disableRemoteRelationship(User, 'accessTokens');
  disableRemoteRelationship(User, 'credentials');
  disableRemoteRelationship(User, 'identities');
  disableRemoteRelationship(User, 'personalAccount');

  // TODO add here too the accounts that the user has read access
  User.afterRemote('*', (ctx, user, next) =>
    loadIds(ctx.result, 'accountIds', app.models.Account, 'ownerIds')
      .then(next)
      .catch(next));
}

