#!/bin/bash

echo "Importing SSH Key"

echo "REMOTE_PORT = ${REMOTE_PORT}"
echo "REMOTE_USER = ${REMOTE_USER}"
echo "REMOTE_HOST = ${REMOTE_HOST}"

openssl aes-256-cbc -K $encrypted_59fa64142762_key -iv $encrypted_59fa64142762_iv -in deploymentCookBook.enc -out deploymentCookBook -d

eval "$(ssh-agent -s)"

chmod 600 deploymentCookBook

ssh-add deploymentCookBook