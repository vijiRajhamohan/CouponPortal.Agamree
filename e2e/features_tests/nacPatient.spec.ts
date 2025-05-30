// TODO: can remove for non-cizplam sites - only used to enable conditional fields
import VueSelector from 'testcafe-vue-selectors';

// import page object
import nacPatientPage from '../../page-objects/nacPatientPage';

// import test tools
import { testUrl } from '../@tools/url';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import checkRequiredFields from '../@tools/checkRequiredFields';
import checkInvalidValues from '../@tools/checkInvalidValues';
import { fillTextForm, fillMultiChoiceForm } from '../@tools/fillForm';
import { checkPath } from '../@tools/checkPath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

// import form data
import Patient from '../@data/helpers/patient';
import Caregiver from '../@data/helpers/caregiver';

// import mock responses
// TODO: choose between enterprise/coupon mock responses - defaulted to enterprise
// import mockResponses from '../@data/coupon/mock_responses';
import mockResponses from '../@data/enterprise/mock_responses';

// import test types
import { IForm } from '../@types/forms';
import { IPatientFormConditions } from '../@types/forms/formConditions';
import { IMultiChoiceAnswers } from '../@types/forms/form-fields/multiChoice';

fixture`NAC Patient`.page(testUrl('/need-a-card/patient-information')).beforeEach(async t => {
    await unlockSite(t);
});

test('Required Fields - No Conditions', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient');

    await t.click(nacPatientPage.buttons.next.selector);
    const { textInputs, radioQuestions, checkboxQuestions } = nacPatientPage;
    const form: IForm = {
        textInputs,
        radioQuestions,
        checkboxQuestions,
    };
    await checkRequiredFields(t, form, taker);
});

test('Required Fields - Conditional - Caregiver, Contact Preferences & Cell Phone', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient/conditionally-required');

    // TODO: remove this step for non-cizplam sites - conditional fields will appear by default if applicable
    await t.maximizeWindow();
    const isDrawerVisible = await VueSelector('ref:drawer_config').visible;
    if (!isDrawerVisible) await t.click(VueSelector('ref:icon_navDrawer'));
    await t
        .click(VueSelector('ref:drawer_features_panel'))
        .click(VueSelector('ref:drawer_features_marketingOptIn').find('input'))
        .click(VueSelector('ref:drawer_features_conditionalFields').find('input'))
        .click(VueSelector('ref:icon_navDrawer'));

    // enable conditional fields and click next
    await t
        .click(nacPatientPage.radioQuestions.caregiver.options.yes.selector)
        .click(nacPatientPage.checkboxQuestions.patientConsentText.options.yes.selector)
        .click(nacPatientPage.checkboxQuestions.patientConsentMarketing.options.yes.selector)
        .click(nacPatientPage.buttons.next.selector);

    // check conditionally required fields
    const { textInputs, checkboxQuestions, radioQuestions } = nacPatientPage;
    const form: IForm = {
        textInputs,
        checkboxQuestions,
        radioQuestions,
    };
    const conditions: IPatientFormConditions = {
        drawerConditionalFields: true,
        drawerMarketingOptIn: true,
        caregiver: true,
        consentText: true,
        consentMarketing: true,
        consentMarketingContactPreferenceText: false,
        cellSameAsAbove: false,
    };
    await checkRequiredFields(t, form, taker, conditions);
});

test('Date of Birth - Invalid', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient/invalid-dob');

    const errorMessages = {
        notADate: 'Patient Date of Birth (MM/DD/YYYY) is invalid',
        notBorn: 'Patient Date of Birth (MM/DD/YYYY) must not be a future date.',
        isAVampire: 'Patient Date of Birth (MM/DD/YYYY) must within the last 150 years.',
        isAMinor: 'Patient Date of Birth (MM/DD/YYYY) must be at least 18 years ago.',
    };
    await checkInvalidValues(t, nacPatientPage.textInputs.dateOfBirth, errorMessages, taker);
});

test('Email - Invalid', async t => {
    await waitForPageToLoad(t);

    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient/invalid-email');
    const errorMessages = {
        missingUsername: 'Patient Email is not a valid email address',
        missingAt: 'Patient Email is not a valid email address',
        missingDomain: 'Patient Email is not a valid email address',
        missingDomainServer: 'Patient Email is not a valid email address',
        missingDomainExtension: 'Patient Email is not a valid email address',
    };
    await checkInvalidValues(t, nacPatientPage.textInputs.email, errorMessages, taker);
});

test('Phone Number - Invalid', async t => {
    await waitForPageToLoad(t);

    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient/invalid-phone');
    const errorMessages = {
        areaCode0: 'Patient Phone Number must be a 10 digit phone number',
        areaCode1: 'Patient Phone Number must be a 10 digit phone number',
        exchangeCode0: 'Patient Phone Number must be a 10 digit phone number',
        exchangeCode1: 'Patient Phone Number must be a 10 digit phone number',
    };
    await checkInvalidValues(t, nacPatientPage.textInputs.phoneNumber, errorMessages, taker);
});

test('Next & Successful - No Conditions', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient');

    const conditions: IPatientFormConditions = {
        drawerConditionalFields: false,
        drawerMarketingOptIn: false,
        caregiver: false,
        consentText: false,
        consentMarketing: false,
        consentMarketingContactPreferenceText: false,
        cellSameAsAbove: false,
    };
    await fillTextForm(t, nacPatientPage.textInputs, new Patient(), conditions);

    await taker.takeFullpageScreenshot('Next - Success - No Conditions');

    await t.click(nacPatientPage.buttons.next.selector);
    await checkPath('/need-a-card/success');

    // TODO: choose responses based on enterprise/coupon (also pharmacy/medical)
}).requestHooks(
    mockResponses.surveySessions.success,
    mockResponses.fullSurveySessions.success,
    mockResponses.gbeV2.noResult,
    mockResponses.enrollments.successPharmacy
);

// eslint-disable-next-line jest/no-disabled-tests
test.skip('Next & Successful - Conditions - Caregiver, Contact Preferences & Cell Phone', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient');

    // TODO: remove this step for non-cizplam sites - conditional fields will appear by default if applicable
    await t.maximizeWindow();
    const isDrawerVisible = await VueSelector('ref:drawer_config').visible;
    if (!isDrawerVisible) await t.click(VueSelector('ref:icon_navDrawer'));
    await t
        .click(VueSelector('ref:drawer_features_panel'))
        .click(VueSelector('ref:drawer_features_marketingOptIn').find('input'))
        .click(VueSelector('ref:drawer_features_conditionalFields').find('input'))
        .click(VueSelector('ref:icon_navDrawer'));

    // set form conditions
    const conditions: IPatientFormConditions = {
        drawerConditionalFields: true,
        drawerMarketingOptIn: true,
        caregiver: true,
        consentText: true,
        consentMarketing: true,
        consentMarketingContactPreferenceText: true,
        cellSameAsAbove: true,
    };

    // fill radio form
    const radioAnswers: IMultiChoiceAnswers = {
        caregiver: nacPatientPage.radioQuestions.caregiver.options.yes,
    };
    await fillMultiChoiceForm(t, nacPatientPage.radioQuestions, radioAnswers, conditions);

    // fill text form
    const textInputValues = { ...new Patient(), ...new Caregiver() };
    await fillTextForm(t, nacPatientPage.textInputs, textInputValues, conditions);

    // fill checkbox form
    const checkboxAnswers: IMultiChoiceAnswers = {
        patientConsentText: nacPatientPage.checkboxQuestions.patientConsentText.options.yes,
        cellSameAsAbove: nacPatientPage.checkboxQuestions.cellSameAsAbove.options.yes,
        patientConsentMarketing: nacPatientPage.checkboxQuestions.patientConsentMarketing.options.yes,
        contactPreferences: [
            nacPatientPage.checkboxQuestions.contactPreferences.options.text,
            nacPatientPage.checkboxQuestions.contactPreferences.options.email,
        ],
    };
    await fillMultiChoiceForm(t, nacPatientPage.checkboxQuestions, checkboxAnswers, conditions);

    await taker.takeFullpageScreenshot('Next - Success - Conditions');

    await t.click(nacPatientPage.buttons.next.selector);
    await checkPath('/need-a-card/success');

    // TODO: choose responses based on enterprise/coupon (also pharmacy/medical)
}).requestHooks(
    mockResponses.surveySessions.success,
    mockResponses.fullSurveySessions.success,
    mockResponses.gbeV2.noResult,
    mockResponses.enrollments.successPharmacy
);

/* FIXME:
    remove skip once enrollment call is setup
    also remove below eslint comment
*/
// eslint-disable-next-line jest/no-disabled-tests
test.skip('Next & Enrollment Error', async t => {
    await waitForPageToLoad(t);
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/patient');

    await fillTextForm(t, nacPatientPage.textInputs, new Patient());

    await taker.takeFullpageScreenshot('Next - Enrollment Error');

    await t.click(nacPatientPage.buttons.next.selector);
    await checkPath('/error');

    // TODO: choose responses based on enterprise/coupon
}).requestHooks(
    mockResponses.surveySessions.success,
    mockResponses.fullSurveySessions.success,
    mockResponses.gbeV2.noResult,
    mockResponses.enrollments.error
);
