'use strict';

var createdUpdated = require('../../server/utils/created-updated');

module.exports = function(Environment) {

  // Update updatedBy and family
  createdUpdated(Environment);

};
