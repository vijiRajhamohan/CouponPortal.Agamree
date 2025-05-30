# Purpose

Feature tests are solely meant to test individual components of the UI - mainly pages. These tests should not rely on any external services, and should use mock responses in the case that there is an API call triggered by some action in the UI; e.g. hitting the next button from the patient information page.

All mock responsese are combined into a single object. There is one object for enterprise mock responses, and another for coupon mock responses. The set you import depends on whether the site is using enterprise or coupon services. Here is where they are located:

* enterprise: ~/tests/e2e/@data/enterprise/index.ts

* coupon: ~/tests/e2e/@data/coupon/index.ts

Mock responses can then be attached attached to each test function as needed. Here is an example for the patient Next & Success test where we want to mock all successful responses from the enterprise services:

import mockResponses from '../@data/enterprise/mock_responses'

test('Next & Successful - No Conditions', async t => {
 // your test code
}).requestHooks(
    mockResponses.surveySessions.success,
    mockResponses.fullSurveySessions.success,
    mockResponses.gbeV2.noResult,
    mockResponses.enrollments.successPharmacy
);
