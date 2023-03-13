#!/bin/bash

# exit if first arg not set
if [ -z "$1" ]; then
    echo "specifiy devcontainer"
    exit 1
fi

# get first numeric arg and store in folder var
folder=$1

# create local .devcontainer folder
mkdir .devcontainer

# create array of Dockerfile, devcontainer.json, and docker-compose.yml
files=(Dockerfile devcontainer.json docker-compose.yml)

# download all files in array
# https://raw.githubusercontent.com/devidw/devcontainers/master/$folder/.devcontainer/
for file in "${files[@]}"
do
    curl -o .devcontainer/$file https://raw.githubusercontent.com/devidw/x/main/devcontainers/$folder/.devcontainer/$file

    # delte those files with "404: Not Found" content
    if grep -q "404: Not Found" .devcontainer/$file; then
        rm .devcontainer/$file
    fi
done