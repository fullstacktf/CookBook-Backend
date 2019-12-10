#!/bin/bash

COMMAND="cd ${REMOTE_PATH} && ls -la"


ssh -o StrictHostKeyChecking=no -i deploymentCookBook -v ${REMOTE_USER}@${REMOTE_HOST} ${COMMAND}