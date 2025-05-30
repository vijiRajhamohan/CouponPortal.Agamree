# Testcafe Helper Data

1. Coupon: endpoints and mock data for Coupon services. Used in generating mock responses and saving network requests

2. Enterprise: endpoints and mock data for Enterprise services. Used in generating mock responses and saving network requests

3. Helpers: classes for creating fake input data.
    * caregiver: creates fake data for a set of caregiver fields
    * insurance: creates fake data for a set of insurance fields
    * patient: creates fake data for a set of patient fields
    * randomizers: generates random genders, dates, zip codes and phone numbers

4. Shared: mock data that is shared between coupon and enterprise
    * dates: expiration dates for mock enrollments and validation in UI, as well as month name parser for filling out datepicker inputs
    * enrollments: enrollment statuses and eligibility codes of enrollment responses
    * member numbers: dummy member numbers and member number patterns for testing
    * mock response types: Base functions for generating success/error mock responses
