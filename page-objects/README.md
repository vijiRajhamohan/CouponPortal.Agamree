# Structuring page models

## Form Fields

There are 3 types of form fields:

1. Text Inputs:
    - v-text-fields (can include datepicker)
    - v-autocomplete (isEntered)
2. Radio Questions
    - v-radio-group (includes eligibility questions)
3. Checkbox Questions
    - A group of v-checkbox components

Each group of form fields is meant to be stored as a property on the page model:

```html
textInputs: ITextInputs = { // ...text field objects } radioQuestions: IMultiChoiceQuestions = { // ...radio question objects }
checkboxQuestions: IMultiChoiceQuestions = { // ...text input fields }
```

The interfaces ITextInputs and IMultiChoiceQuestions are used to provide a specific type structure for each group of input field:

-   ITextInputs: defines how a group of text fields should be structured and the properties that each text field can contain.
-   IMultiChoiceQuestions: defines how multi-choice fields should be structured (i.e. radio/checkbox groups)

More Info on form test types can be found in ~/tests/e2e/@types/forms/index

## Standard Elements

Standard elements that can be stored on the page model include:

1. Buttons: For flows and form submissions

2. Messages: headings, paragraphs, etc

3. Card: encapsulates card art elements on success page

4. Links: Usually in the header and footer

5. Images: logos and page-body images

## Selectors

Testcafe has two ways of targeting elements on the page:

1. Selector
    - Meant for targeting HTML Elements found directly in the DOM
    - Accept the same attributes as a document query selector, although data-test is preferred since styling is never tied to it
    - Written as Selector('[data-test="testElement"]')
2. VueSelector
    - Meant for targeting Vue components that can only be seen in the Vue Dev tools
    - There is no way to visually see the ref property on a Vue component in the Vue Dev tools
    - Written as VueSelector('ref:testRef')

### Selector Naming Convention - Form Fields

Selectors and VueSelectors for form fields should be named using a heirarchy that emulates our account database models. Each level of
heirarchy should be separated by snake_case, and multiple words should be written with camelCase. These are the main account database models
in use:

-   account: VueSelector('ref:account_contactPreferences_0_contactInfoTypeText')
-   patient: VueSelector('ref:patient_addresses_0_city')
-   prescriber: VueSelector('ref:prescriber_firstName')
-   site: VueSelector('ref:prescriber_firstName')
-   pharmacy: VueSelector('ref:pharmacy_nabp')
-   payor: VueSelector('ref:payor_payorBenefit_relationshipToPatient')

Caregiver information is not clear how to store:

-   caregiver: VueSelector('ref:caregiver_lastName')

Survey questions should follow a heirarchical naming as well

-   eligibility (use numeric naming):

    -   question: VueSelector('ref:eligibility_1_question')
    -   answer: VueSelector('ref:eligibility_1_answerYes')

-   Other survey questions
    -   question: VueSelector('ref:survey_patientConsentMarketing_question')
    -   answer: VueSelector('ref:survey_patientConsentMarketing_answerYes')

### Selector Naming Convention - Standard Elements

Selectors for other HTML elements should be named based on how they are stored in the page model, followed by one or more descriptors.

1. Buttons (v-btn): VueSelector('ref:btn_next')

2. Messages: Selector('[data-test="message_h1"]')

3. Card: Selector('[data-test="card_img"]')

4. Links: Selector('[data-test="link_footer_privacy"]')

5. Images: Selector('[data-test="img_header_logo"]')

### Selector Properties

A standard element selector implements a very simple interface called ISelector: The ISelector interface represents an object with a
property called selector, and a value that's either a testcafe Selector or VueSelector. Ex:

```html
testOne: { selector: VueSelector('ref:testOne') } testTwo: { selector: VueSelector('ref:testOne') }
```

In the page model, selectors should be grouped into a nested object called ISelectors. This represents a collection of like elements:

```html
elements: ISelectors = { testOne: { selector: Selector('[data-test="el_testOne"]') }, testTwo: { selector: VueSelector('ref:el_testTwo') } }
```

Selectors for form fields have additional properties that allow them to be filled out and validated in different ways. All form fields take
the required property, while other properties vary based on the type of input. Here is a breakdown by field type:

1. Text Field: a text input field (ITextField) comes in three different varieties - standard text fields, autocompletes (text field with
   dropdown), and datepicker. Because of these variations, text fields can take the following optional properties

    - invalidValues: applies to standard text fields and datepicker (since a date can still be typed manually); autocomplete fields only
      accept values from the dropdown. The invalidValues object specifies input values that would make the field invalid if entered into the
      form field (e.g. an email missing the @ symbol)
    - isFilled: Could potentially apply to any text field, but usually not the datepicker one (since dates are almost always entered
      manually). When set to true, this property indicates that a field has already been filled out as result of filling out another field
      (e.g. City and State fill out automatically after entering the zip).
    - isEntered: Only applies to autocomplete fields; means that the enter key must be pressed to finish filling out the field.
    - datePicker: Only appies to datepicker fields. Used to click the calendar options when selecting a date.

    Like standard element selectors, text field selectors are grouped into an interface called ITextFields:

    ```html
    textFields: ITextFields = { dateOfBirth: { selector: VueSelector('ref:patient_dateOfBirth), invalidValues: { inFuture: '01/01/3000' //
    other invalid dob's }, datePicker: true }, city: { selector: VueSelector('ref:patient_addresses_0_city'), isFilled: true }, planType: {
    selector: VueSelector('ref:payors_0_payorBenefit_planType'), isEntered: true } }
    ```

2. Multichoice Questions (i.e. Radios and Checkboxes):

    - selector: although this is a universal property of all elements in the page model, for multichoice fields it represents the entire
      question (i.e. what you will use when running required validations)
    - options: an object representing all the potential options that can be selected

    Radio and checkbox fields should also be grouped into collections, called IMutiChoiceQuestions:

    ```html
    radioQuestions: IMultiChoiceQuestions = { caregiver: { selector: VueSelector('ref:survey_caregiver_question'), required: true, options:
    { yes: { selector: VueSelector('ref:survey_caregiver_answerYes') }, no: { selector: VueSelector('ref:survey_caregiver_answerNo') }, } }
    // additional radio questions } checkboxQuestions: IMultiChoiceQuestions = { patientConsentText: { selector:
    VueSelector('ref:survey_patientConsentText_question'), required: false, options: { yes: { selector:
    VueSelector('ref:survey_patientConsentText_answerYes') } // additional options if applicable } }, // additional checkbox questions }
    ```

3. Eligibility Questions: these are a special type of radios that take an additional property called isEligible, which is used to determine
   how to fill out the eligibility form for different test cases:

    ```html
    radioQuestions: IEligibilityQuestions = { medication: { selector" VueSelector('ref:eligibility_1_question'), required: true, options: {
    yes: { selector: VueSelector('ref:eligibility_1_answerYes'), isEligible: false, }, no: { selector:
    VueSelector('ref:eligibility_1_answerNo'), isEligible: true, }, }, }, // additional eligibility questions }
    ```

### Form Conditions

Some business rules specify that certain fields should only be shown if another field is selected. A prime example is contact preferences.
This checkbox field is usually only shown when the user checks the marketing opt-in question. As a result we should only run required checks
or fill out the contact preferences question when it is visible (i.e. when the marketing opt-in checkbox is selected). A few things had to
be done in order to implement this feature

1. Create form field conditions for each form that will need conditions. This is done in the file ~/tests/e2e/@types/formConditions.ts. By
   default, the patient form is the only form with conditions so far. Additional form condition interfaces can be created per the file
   instructions.

2. Page object form fields: add isVisibleConditions and isFilledConditions properties as needed. These properties take key, value pairs that
   correspond to the form field conditions created in step 1.

    - isVisibleConditions: an object that specifies when the form field is visible. This is used for filling out the field and conducting
      required checks. Ex:

        ```html
        caregiverFirstName: { selector: VueSelector('ref:caregiver_firstName'), required: true, isVisibleConditions: { caregiver: true } }
        ```

    - isFilledConditions: an object that specifies when the form field is already filled out. This is used to skip filling out the field or
      doing required checks. This is different from the standard isFilled, which means that field will always be filled. Ex:

        ```html
        cellPhone: { selector: VueSelector('ref:patient_phoneNumbers_1_phoneNumber'), required: true, invalidValues: { areaCode0:
        '0999999999', areaCode1: '1999999999', exchangeCode0: '999099999', exchangeCode1: '999199999' }, isVisibleConditions: { consentText:
        true, }, isFilledConditions: { cellSameAsAbove: true } }
        ```

3. Test Files: import the form conditions interface for each form that will be filled out or where conditionally required fields will be
   validated. You will use the form condition interface to create a conditions object, which will then be passed as an argument to the fill
   form/check required field functions. Example for checking required fields on the patient info page:

    ```html
    const conditions: IPatientFormConditions = { caregiver: true, consentMarketing: true, consentText: true, cellSameAsAbove: false } await
    checkRequiredFields(t, form, taker, conditions)
    ```
