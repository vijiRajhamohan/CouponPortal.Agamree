# Purpose

Integration tests represent full end-to-end UI testing, including integration with external services. They are written to test different
happy and negative paths, and to save the results of each test run (screenshots and network requests) by envirnoment.

## Folder Structure

Test results will be saved under `~/test_results`, containing the following nested subfolders:

1. Environment Name: the environment used to run your integration tests

2. Test file/folder name: the name of the file or folder of tests being run

3. Timestamp: when you ran the integration test script

4. Test artifacts:

    a. Network Data: contains subfolders named for each test function, each of which contains the JSON network data for all API calls made.

    b. Screenshots: contains screenshots under each taker path you set up inside your test functions. For more info on screenshot takers,
    please see `~/tests/e2e/legal_screenshots/README.md`

## Command Line

The integration test script can be run through the command line with `npm run save:test ./path/to/test` - replace ./path/to/test with the
actual path to either the integration test folder, or to the individual integration test file you want to run. Ex:
`npm run save:test ./tests/e2e/integration_tests` - this would run all test files inside the integration_tests folder.

By default, the integration test script will run tests in localhost, but you can easily run them in any of the other following environments:
qa, uat, prod (case insensitive). Ex. of running in UAT: `npm run save:test ./tests/e2e/integration_tests uat`
