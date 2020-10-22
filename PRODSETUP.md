# Production setup
This setup applies to any NodeJS app that needs NGinX reverse proxy and SSL configuration.

### Preparing the environment and download the resources
#### Install NVM
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
```

#### Install last node version via NVM
```
nvm install node
```

#### Download repo and go to the directory
```
sudo git clone <repo address>
cd <project folder>
```

#### Install deps
```
npm i
```

### SSL keys generation via Certbot
#### Install Certbot
```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

#### Open firewall ports
```
sudo ufw allow 80
sudo ufw allow 443
```

#### Generate pem files
It is being done for wildcard config and for no subdomain.

You will need to have access to your DNS register in order to complete this part.
```
sudo certbot certonly --manual --preferred-challenges dns -d *.<domain> -d <domain>
```

#### Copy keys to the directory you like
```
sudo cp /etc/letsencrypt/live/<domain>/fullchain.pem <path you want>
sudo cp /etc/letsencrypt/live/<domain>/privkey.pem <path you want>
```

#### Disable key auto renew
As we are doing it using manual mode, because it was not possible in another way. This should be disabled.
```
sudo systemctl disable certbot.timer
```

### Set ENV variables
#### Create a file on profile.d for those variables
```
sudo touch /etc/profile.d/<project name>-vars.sh
```

#### Set variables
```
export APPPORT=<port to backend app>
export ADDRESSDB=<address of prod database>
export USERDB=<user to access prod database>
export PASSDB=<password to access prod database>
export NAMEDB=<name of prod database>
export PARAMSDB=<extra params for DB connection string>
export FRONTENDADDRESS=<frontend address>
export HTTPSKEYFILE=<location of SSL/TLS key>
export HTTPSCERTFILE=<location of SSL/TLS certificate>
export SALTROUNDS=<salt rounds for encripting>
export SECRETKEYHMAC=<secret for HMAC encryption>
```
PS.: In DEV env there is an env variables named `JWTDEVTOKEN`. It MUST NOT be set here, in PRODUCTION.

### Setup the reverse proxy
```
sudo ./nginx_install.sh
```

### Setup PM2
#### Install it
```
npm install pm2 -g
```

#### Config it

Install log rotate
```
pm2 install pm2-logrotate
```
Config it
```
pm2 set pm2-logrotate:compress true
```

#### Start app
```
pm2 start --name <app name> --log <path to combined log> --time <path to index.js>
```

#### Set PM2 to start the app automatically
```
pm2 startup
pm2 save
```

### Restart everything
```
pm2 restart <app name>
sudo service nginx restart
```

### Setup deploy script
Copy the script `deploy.sh` to home directory and change paths, URL and app name within.
