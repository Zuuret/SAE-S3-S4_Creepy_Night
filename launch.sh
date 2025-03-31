#!/bin/bash

# usage : ./launch.sh [cible] | cible : "serveur" pour lancer le serveur seul | rien pour lancer le serveur et le client

git pull

if [ "$1" = "serveur" ]; then
    cd serveur/ || exit
    npm install
    npm start
else
    cd serveur/ || exit
    npm install
    npm start &
    SERVER_PID=$!
    cd ../client/ || exit
    npm install
    npm run serve
    wait $SERVER_PID
fi