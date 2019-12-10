#!/bin/bash

echo "Importing SSH Key"

echo "REMOTE_PORT = ${REMOTE_PORT}"
echo "REMOTE_USER = ${REMOTE_USER}"
echo "REMOTE_HOST = ${REMOTE_HOST}"

openssl aes-256-cbc -K $encrypted_2ee26b6c1e49_key -iv $encrypted_2ee26b6c1e49_iv -in deploymentCookBook.enc -out deploymentCookBook -d

eval "$(ssh-agent -s)"

chmod 600 deploymentCookBook

ssh-add deploymentCookBook