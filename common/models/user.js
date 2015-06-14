'use strict';

function disableRemoteRelationship(model, relationship) {
  model.disableRemoteMethod('__count__' + relationship, false);
  model.disableRemoteMethod('__get__' + relationship, false);
  model.disableRemoteMethod('__create__' + relationship, false);
  model.disableRemoteMethod('__delete__' + relationship, false);
  model.disableRemoteMethod('__destroyById__' + relationship, false);
  model.disableRemoteMethod('__findById__' + relationship, false);
  model.disableRemoteMethod('__getById__' + relationship, false);
  model.disableRemoteMethod('__updateById__' + relationship, false);
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
}

