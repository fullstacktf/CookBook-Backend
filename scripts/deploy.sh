#!/bin/bash

scp -o StrictHostKeyChecking=no -i deploymentCookBook -v -r build ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}

#COMMAND="cd ${REMOTE_PATH} && ls -la"

#ssh -o StrictHostKeyChecking=no -i deploymentCookBook -v ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND}