#!/usr/bin/env bash

release=$(lsb_release --codename | cut -f2)

echo "deb https://nginx.org/packages/ubuntu/ $release nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
echo "deb-src https://nginx.org/packages/ubuntu/ $release nginx" | sudo tee /etc/apt/sources.list.d/nginx.list

sudo apt-get update
sudo apt-get install nginx

echo "What is the servername? (ex: localhost)"
read HOST
echo "What is the frontend static path? (ex: /home/user/frontend-project)"
read FRONTEND
echo "What is the server port? (ex: 3000)"
read PORT
echo "What is the SSL KEY path? (ex: /home/user/project/file.key)"
read SSLKEY
echo "What is the SSL CERT path? (ex: /home/user/project/file.crt)"
read SSLCERT


sudo cat <<EOF >> /etc/nginx/conf.d/mginstitute.conf
server {
    server_name _;
    listen $HOST:443 ssl;
    ssl_certificate     $SSLCERT;
    ssl_certificate_key $SSLKEY;
    ssl_session_timeout 30m;
    ssl_session_cache   shared:SSL:400k;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    server_tokens off;
    charset utf-8;

    location / {
            proxy_pass https://$HOST:$PORT;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_cache_bypass \$http_upgrade;
    }

    location ~* ^.+\.(html|css|js|pdf|jpg|jpeg|png|svg) {
        root $FRONTEND;
    }
}
EOF

sudo nginx -s reload

echo "NGinX installed and configured to act as a reverse proxy from port 443 to $HOST:$PORT."
