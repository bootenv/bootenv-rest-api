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
* `npm install`

## DB Config

The data layer for API is based on `MongoDB`.

> Now, we are not using `bootenv` to setup our conf variables but we really need migrate as soon as possible!

## Running

* `nvm use`
* `npm start`

### Running in development

In development mode (`NODE_ENV=development`) we monitor for any changes and automatically restart the server

* `nvm use`
* `npm run serve`

Visit your API status at [http://localhost:3000](http://localhost:3000).
To explore your API visit [http://localhost:3000/explorer](http://localhost:3000/explorer).

### Docker

As we want to run this REST-API in a [Docker](https://www.docker.com/) container, please take a look on a given `Dockerfile`. 
The [Dockerfile](Dockerfile) is simple and straightforward.

#### Running with Docker Compose

The quickest way to get started is using [Docker Compose](https://docs.docker.com/compose/).

```
docker-compose up
```

__NOTE:__ Please allow a couple of minutes for the REST-API to start.

#### Build and Running the Docker Image

Alternately, you can manually build and run the Docker REST-API container.

```
docker build --tag="bootenv/bootenv-rest-api:latest" .
docker run -d --name api -p 3000:3000 --env='NODE_ENV=development' --env='MONGO_URL=mongodb://localhost:27017' bootenv/bootenv-rest-api:latest
```

## Code Generators

Make use of the many generators for code, try `slc --help` for more details

## Further Reading / Useful Links

* [StrongLoop](https://strongloop.com/)
* [LoopBack](http://docs.strongloop.com/display/public/LB/LoopBack)
* [Getting started with LoopBack](http://docs.strongloop.com/display/public/LB/Getting+started+with+LoopBack)
* [Docker](https://docs.docker.com/userguide/)
* [Docker Compose](https://docs.docker.com/compose/install/)

## Versions
 
 - 1.0.0-alpha.1 (current)

## License

[Apache-2.0](LICENSE)
