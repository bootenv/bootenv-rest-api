'use strict';

var createdUpdated = require('../../server/utils/created-updated');

module.exports = function(Project) {

  // Update updatedBy and family
  createdUpdated(Project);

};
