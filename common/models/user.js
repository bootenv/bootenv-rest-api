'use strict';

var createdUpdated = require('../../server/utils/created-updated');

module.exports = function (user) {

  // Update updated_by and family
  createdUpdated(user);

};
