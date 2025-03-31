#!/bin/bash

# usage : ./launch.sh [cible] | cible : "serveur" pour lancer le serveur seul | rien pour lancer le serveur et le client

OS=$(uname -s)
run_npm() {
    cd "$1" || exit 1
    npm install
    if [ "$OS" = "MINGW64_NT-10.0" ] || [ "$OS" = "MSYS_NT-10.0" ]; then
        start cmd.exe /c "npm start"
    else
        npm start &
        echo $!
    fi
}

git pull

if [ "$1" = "serveur" ]; then
    run_npm "serveur"
else
    SERVER_PID=$(run_npm "serveur")
    cd ../client/ || exit 1
    npm install
    npm run serve
    if [ "$OS" != "MINGW64_NT-10.0" ] && [ "$OS" != "MSYS_NT-10.0" ]; then
        wait "$SERVER_PID"
    fi
fi
