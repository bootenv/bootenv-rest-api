'use strict';

var Environment = function () {
  this.name = (process.env.NODE_ENV || 'development');
};

Environment.prototype.getName = function () {
  return this.name;
};

Environment.prototype.isDev = function () {
  return (this.name === 'development');
};

Environment.prototype.isProd = function () {
  return (this.name === 'production');
};

module.exports = new Environment();
