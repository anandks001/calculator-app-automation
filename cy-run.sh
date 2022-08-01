#!/usr/bin/env bash
echo "Running Cypress e2e tests headless mode"

IMAGE_NAME=cypress-test-image:1.0.0

docker run -i -v $PWD:/e2e -t $IMAGE_NAME