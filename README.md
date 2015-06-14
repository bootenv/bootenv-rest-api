# [![>bootenv](http://bootenv.com/img/logo-light-transparent-readme-files.png)](http://bootenv.com)-REST API

[![license](https://img.shields.io/badge/license-Apache_2.0-blue.svg)]()
[![engine](https://img.shields.io/badge/iojs-v2.1.0-yellow.svg)]()
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![Build Status](https://travis-ci.org/bootenv/bootenv-rest-api.svg?branch=master)](https://travis-ci.org/bootenv/bootenv-rest-api)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [StrongLoop CLI](https://strongloop.com/)
* [MongoDB](https://www.mongodb.org/)

## Installation

* `git clone git@github.com:bootenv/bootenv-rest-api.git` this repository
* change into the new directory `bootenv-rest-api`
* `nvm use`
* `npm install -g strongloop`
* `npm install -g nodemon`
* `npm install`

## DB Config

The data layer for API is based on `MongoDB`.

> Now, we are not using `bootenv` to setup our conf variables but we really need migrate as soon as possible!

```
mongod --noauth
mongo
use bootenv-db;
db.createUser({user: "I-need-bootenv-here", pwd: "Serious-I-need-bootenv-here-NOW!", roles: [ { role: "userAdmin", db: "bootenv-db" } ]});
```

## Running / Development

* `nvm use`
* `nodemon`
* Visit your API status at [http://localhost:3000](http://localhost:3000).
* To explore your API visit [http://localhost:3000/explorer](http://localhost:3000/explorer).

### Code Generators

Make use of the many generators for code, try `slc --help` for more details

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [StrongLoop](https://strongloop.com/)
* [LoopBack](http://docs.strongloop.com/display/public/LB/LoopBack)
* [Getting started with LoopBack](http://docs.strongloop.com/display/public/LB/Getting+started+with+LoopBack)

## Versions
 
 - 1.0.0 (current)

## License

[Apache-2.0](LICENSE)
