# calculator-app-automation
Calculator app E2E tests using cypress
## Run tests in Docker:
* Run `./build.sh` to create a custom docker image
* Run `./cy-run.sh` to run tests in docker

## Run tests in local:
* Run `npm i` to install dependencies
* Run `npm run test:open` to run tests in browser mode
* Run `npm run test:run` to run tests in headless mode
* Note - Visual tests may fail in local due pixel different between docker and local browser

## Test Reports:
* allure Test results will be available in `allure-results` directory
* Run `npm run report` to generate html report
