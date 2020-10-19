# MG Institute API
[![Build Status](https://travis-ci.com/renie/mg-institute-api.svg?branch=master)](https://travis-ci.com/renie/mg-institute-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/7dc85865d39cb4d344db/maintainability)](https://codeclimate.com/github/renie/mg-institute-api/maintainability)

## Dependencies

This project requires **NodeJS (version >= 14.3)**, and **MongoDB (version >= 4.2.9)**.
If you prefer to use a remote database, cloud MongoDB for instance, you just need to install NodeJS on your machine. Other deps will be download on next step.

### Developers
You will need [codeclimate installed](https://github.com/codeclimate/codeclimate/blob/master/README.md) on your machine. In order to do that, you will have to [install docker](https://docs.docker.com/engine/install/ubuntu/) before.

Install engines (may take a while to finish and need sudo):
```
codeclimate engines:install
```

You can run it with (may need sudo):
```
npm run codeclimate
```

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
HTTPSKEYFILE=<path to your ssl key file (will be generated on next step)>
HTTPSCERTFILE=<path to your ssl cert file (will be generated on next step)>
```
**After running seed, you should have a user with email `test@test.com` and password `123456`. This user can be used to test logged API accesses.**

Seed dev database:

```
npm run dev-seed
```

Create a `.env-test` file and set the same variables you have at `.env`, but pointing to another database (this will be used just by automated tests).

Seed test database:

```
npm run dev-test
```

### SSL/TSL config (dev/staging)
This config is important to have an HTTPS environment for devs.
 
#### Become a Certificate Authority

Generate private key
```
openssl genrsa -des3 -out myCA.key 2048
```
Generate root certificate
```
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 825 -out myCA.pem
```

#### Create CA-signed certs

Create a variable to ease next steps
```
NAME=localhost
```
Generate a private key
```
openssl genrsa -out $NAME.key 2048
```
Create a certificate-signing request
```
openssl req -new -key $NAME.key -out $NAME.csr
```
Create a config file for extensions
```
touch $NAME.ext
```
Set these variables in that recently created file
```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
```
Create(finally :roll_eyes:) the signed certificate
```
openssl x509 -req -in $NAME.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out $NAME.crt -days 825 -sha256 -extfile $NAME.ext
```
Check if everything went fine
```
openssl verify -CAfile myCA.pem -verify_hostname $NAME $NAME.crt
```

#### Now import your CA file on your browser
Import myCA.pem as an Authority in your Chrome settings *(Settings > Manage certificates > Authorities > Import)*

### Setup NGinX as reverse proxy

===

**This section is important JUST IF you want to have your dev environment mirroring production environment. Otherwise you can just run a separate server to frontend with `http-server`, for instance**

===

#### Ubuntu/Debian based distros
Just set up run permissions on script and run it
```
sudo chmod +x ./nginx_install.sh
sudo ./nginx_install.sh
```

#### Other environments

- Install NGinX on last available version
- Create a config file with following contents
```
server {
    server_name _;
    listen <host address>:443 ssl;
    ssl_certificate     <path to your SSL/TLS certificate file>;
    ssl_certificate_key <path to your SSL/TLS key file>;
    ssl_session_timeout 30m;
    ssl_session_cache   shared:SSL:400k;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    server_tokens off;
    charset utf-8;

    location / {
            proxy_pass https://<host address>:<host port>;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
    }

    location ~* ^.+\.(html|css|js|pdf|jpg|jpeg|png|svg) {
        root <path to your frontend public dir>;
    }

    location ~* ^.+\.(html|css|js|pdf|jpg|jpeg|png|svg) {
        root <path to your frontend public dir>;
    }

    location ~* ^\/?$ {
        root <path to your frontend public dir>;
        try_files /index.html =404;
    }

    location / {
        root <path to your frontend public dir>;
        try_files $uri.html $uri / =404;
    }
}
```
- Reload NGinX
```
sudo nginx -s reload
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

## Run Tests

```
npm test
```

## New seeds

If you are creating a new entity, it is very likely you want to seed a new collection.
The place for it is `models/db/seeds.js`.

## Production Environment
If you need instructions to create a new production server, you might want to have a look [here](PRODSETUP.md).
