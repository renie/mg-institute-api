#!/bin/bash

# be sure about dir
cd ~

# remove last deploy
rm -rf lastDeploy

# creates new dir and go to it
mkdir newDeploy
cd newDeploy

# get project code
git clone <project URL> .

# go to specific commit (evaluated by Travis)
git checkout $deploy_commit_hash
git reset --hard

# install deps for new code
npm i

# go make to initial dir
cd ~

# stop server
pm2 stop <app name>

# switch versions
mv <app folder name> lastDeploy
mv newDeploy <app folder name>

# start server
pm2 restart <app name>
service nginx restart

chown -R ubuntu:ubuntu lastDeploy
