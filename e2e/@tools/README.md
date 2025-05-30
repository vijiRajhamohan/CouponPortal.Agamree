# Testcafe Utilities

This folder contains a set of Testcafe helper files, which are used to consolidate code for common test functions.

1. changePath: navigates to a different page in the UI. Takes the full URL path of the destination page

2. checkAttribute: used to verify HTML attribute values in the UI. Common attributes include
    * href for link tags
    * src for image tags

3. checkDialog: tests that a link renders a v-dialog component when clicked

4. checkInvalidValues: verifies that text fields are invalid when entering specified text values

5. checkPath: tests the current URL path. Used for testing page flows in the UI.

6. checkRequiredFields: verifies required fields for an entire form. Also accounts for conditional fields

7. clearState: clears the vuex store of all form/flow data

8. expandElementHeight: Used to convert the height or max-height css property to min-height so that element content is completely visible. Primarily used to capture dropdowns in screenshot.

9. fillForm: collection of functions for filling out forms
    * fillTextForm: fills out a group of text fields. Accounts for conditional fields
    * fillMultiChoiceForm: fills out a group of radio or checkbox fields. Accounts for conditional fields and accepts one or multiple answers for each question
    * answerEligibilityQuestions: fills out eligibility form with either all eligible or all ineligible answers

10. hideFloatingFooter: hides the floating footer component if in use. You should use this function inside a beforeEach fixture hook so that the function will run before each test. See the screenshot tests in the Neurelis.Valtoco repo for an example.

11. reloadPage: Reliably reloads the page, preventing the Native Dialog error caused by clearing the store before unloading the page.

12. requestGenerator: saves network responses for a set of tests. The save location is a folder called test-results, located inside the folder of the tests being run. Within the test-results folder, other subfolders are created based on the environment, the name of the tests being run, and finally a timestamp folder for the current iteration. This module should be imported into any test file you want to save network results for, instantiated for all network requests we want to save, and then attached to the fixture as a request hook.

13. requestLogger: a dependency of the requestGenerator. This allows testcafe to log the data of a network request, which is then fed into the request generator. This should be imported and used alongside the request generator, instantiated for all netowrk requests, and attached to the fixture as a request hook.

14. screenshotBrowsers: configuration file for the devices and browsers that will be included in the generate pdf script.

15. setStoreValue: sets the value of a state property in a vuex store module.

16. takeBrowserScreenshots: contains the screenshot taker class that is used to take screenshots within a test and save them to a specified folder within the default screenshots directory (specified in testcaferc.json): ~/artifacts/screenshots

17. testEligibility: Verifies that the eligibility form is working as intended. Tests the ineligible scenario for each question as well as the all eligible scenario; screenshots the filled form state and next page for each iteration

18. unlockSite: Bypasses the site password protection often added to lock down a site from the public. You should use this function inside a beforeEach fixture hook so that the function will run before each test.

19. url: used to specify the starting page of a test fixture.

20. visibleAll: verifies all selectors within a selector group are visible

21. waitForPageToLoad: waits for the spinner to disappear so that tests will not timeout.
