# calculator-app-automation
Calculator app E2E tests using cypress
## Run tests in Docker:
* Run `./build.sh` to create a custom docker image
* Run `./cy-run.sh` to run tests in docker

## Run tests in local:
* Run `npm i` to create a custom docker image
* Run `npm run test:open` to run tests in browser mode
* Run `npm run test:run` to run tests in headless mode
* Note - Visual tests may fail in local due pixel different between docker and local browser

## Test Reports:
* allure Test results will be available in `allure-results` directory
* Run `npm run report` to generate html report

## Issues Observed
* Result field accepts non-numeric values like alphabets and special characters (other than operators)
    - Expectation: Should not allow users to enter alphabets or special characters
* Pressing on `=` button shows `undefined` when there is no expression
    - Expectation: Should do the non empty check before evaluation
* Allows to enter operators first without entering numeric values (like -> `*` or `/`)
    - Expectation: Should not allow user to enter operators before numbers (except `-`)
* Operators keep adding in the result fields
    - Expectation: Should replace the operator if user press different operators
* No character limit in the results field and could not see all the values when it reach max text field width
    - Expectation: Should have limit and show notification to user when it reaches limit