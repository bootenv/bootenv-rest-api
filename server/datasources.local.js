import environment from 'bootenv';

var MONGO_URL_PROPERTY = 'MONGO_URL';
var DEFAULT_MONGO_URL = 'mongodb://localhost:27017/bootenv-db';

export default {
  MongoDS: {
    name: 'MongoDS',
    connector: 'mongodb',
    url: environment.getPropertyOr(MONGO_URL_PROPERTY, DEFAULT_MONGO_URL)
  }
};
