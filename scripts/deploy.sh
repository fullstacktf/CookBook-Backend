#!/bin/bash

scp -o StrictHostKeyChecking=no -i deploymentCookBook -v -r public ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

#ssh -o StrictHostKeyChecking=no -i deploymentCookBook -v ${REMOTE_USER}@${REMOTE_HOST}

#mv /project/public /var/www/chefs4.me/
#COMMAND="cd ${REMOTE_PATH} && ls -la"

#ssh -o StrictHostKeyChecking=no -i deploymentCookBook -v ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND}