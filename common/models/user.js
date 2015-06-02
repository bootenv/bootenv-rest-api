'use strict';

var createdUpdated = require('../../server/utils/created-updated');

function disableRemoteRelationship(user, relationship) {
  user.disableRemoteMethod('__count__' + relationship, false);
  user.disableRemoteMethod('__get__' + relationship, false);
  user.disableRemoteMethod('__create__' + relationship, false);
  user.disableRemoteMethod('__delete__' + relationship, false);
  user.disableRemoteMethod('__destroyById__' + relationship, false);
  user.disableRemoteMethod('__findById__' + relationship, false);
  user.disableRemoteMethod('__getById__' + relationship, false);
  user.disableRemoteMethod('__updateById__' + relationship, false);
}

module.exports = function (user) {

  // Update updated_by and family
  createdUpdated(user);

  user.disableRemoteMethod('count', true);
  user.disableRemoteMethod('find', true);
  user.disableRemoteMethod('findOne', true);
  user.disableRemoteMethod('deleteById', true);

  disableRemoteRelationship(user, 'accessTokens');
  disableRemoteRelationship(user, 'credentials');
  disableRemoteRelationship(user, 'identities');
  disableRemoteRelationship(user, 'personalAccount');

};
