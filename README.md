# MG Institute API
[![Build Status](https://travis-ci.org/renie/mg-institute-api.svg?branch=master)](https://travis-ci.org/renie/mg-institute-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/7dc85865d39cb4d344db/maintainability)](https://codeclimate.com/github/renie/mg-institute-api/maintainability)

## Dependencies

This project requires **NodeJS (version >= 14.3)**, and **MongoDB (version >= 4.2.9)**.
If you prefer to use a remote database, cloud MongoDB for instance, you just need to install NodeJS on your machine. Other deps will be download on next step.

## Setup

Install deps:

```
npm i
```

Create a `.env` file and set these variables:

```
APPPORT=<port where the API will run>
ADDRESSDB=<address where your database is running>
USERDB=<database user>
PASSDB=<database password>
NAMEDB=<database name>
PARAMSDB=<database extra params for connection string>
FRONTENDADDRESS=<address where front-end server is listening. ex:localhost:8080>
```

Seed dev database:

```
npm run dev-seed
```

Create a `.env-test` file and set the same variables you have at `.env`, but pointing to another database (this will be used just by automated tests).

Seed test database:

```
npm run dev-test
```

### Database seeding options

#### Force seed

By default, if a collection has any documents, it won't be seeded. If you want to force it, use the following.

For dev environment

```
npm run dev-seed -- --forceseed
```

For test environment
```
npm run test-seed -- --forceseed
```

#### Force drop

If you want to seed a database from scratch it is possible to drop collections before seeding.

For dev environment

```
npm run dev-seed -- --forcedrop
```

For test environment
```
npm run test-seed -- --forcedrop
```

## Run API server

Development environment:

```
npm run dev
```

Production environment:

```
npm start
```

## Run Tests

```
npm test
```

## New seeds

If you are creating a new entity, it is very likely you want to seed a new collection.
The place for it is `models/db/seeds.js`.
