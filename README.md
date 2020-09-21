# MG Institute API 
[![Build Status](https://travis-ci.org/renie/mg-institute-api.svg?branch=master)](https://travis-ci.org/renie/mg-institute-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/7dc85865d39cb4d344db/maintainability)](https://codeclimate.com/github/renie/mg-institute-api/maintainability)

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