#!/bin/bash

COMMAND="cd $REMOTE_PATH && date >> update_info && docker pull bolften/backend:latest && docker-compose up &"
scp -o StrictHostKeyChecking=no -i deploymentCookBook -v docker-compose.yml ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
ssh -o StrictHostKeyChecking=no -i deploymentCookBook -vp ${REMOTE_PORT} ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND}