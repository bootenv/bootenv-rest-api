'use strict';

module.exports = function(list) {
  return list.map(function(item) {
    return item.id;
  });
};
