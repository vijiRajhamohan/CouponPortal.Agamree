// import page object
import nacInsurancePage from '../../page-objects/nacInsurancePage';

// import test tools
import { testUrl } from '../@tools/url';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import checkRequiredFields from '../@tools/checkRequiredFields';
import checkInvalidValues from '../@tools/checkInvalidValues';
import { fillTextForm } from '../@tools/fillForm';
import { checkPath } from '../@tools/checkPath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

// import test data
import { PharmacyInsuranceItem, MedicalInsuranceItem } from '../@data/helpers/insurance';

fixture`NAC Insurance`.page(testUrl('/need-a-card/insurance')).beforeEach(async t => {
    await unlockSite(t);
});

test('Required Fields - Primary Medical', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/required-primary-medical');

    await waitForPageToLoad(t);

    await t.click(nacInsurancePage.mainInsuranceBtns.medicalExpansionHeader.selector);
    await t.click(nacInsurancePage.primaryMedicalBtns.save.selector);
    const textInputs = nacInsurancePage.primaryMedicalInputs;
    await checkRequiredFields(t, { textInputs }, taker);
});

test('Required Fields - Secondary Medical', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/required-secondary-medical');

    await waitForPageToLoad(t);

    // fill out primary medical
    await t.click(nacInsurancePage.mainInsuranceBtns.medicalExpansionHeader.selector);
    await fillTextForm(t, nacInsurancePage.primaryMedicalInputs, new MedicalInsuranceItem());
    await t.click(nacInsurancePage.primaryMedicalBtns.save.selector);

    // test secondary medical required
    await t.click(nacInsurancePage.mainInsuranceBtns.medicalAddSecondary.selector);
    await t.click(nacInsurancePage.secondaryMedicalBtns.save.selector);
    const textInputs = nacInsurancePage.secondaryMedicalInputs;
    await checkRequiredFields(t, { textInputs }, taker);
});

test('Required Fields - Primary Pharmacy', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/required-primary-pharmacy');

    await waitForPageToLoad(t);

    await t.click(nacInsurancePage.mainInsuranceBtns.pharmacyExpansionHeader.selector);
    await t.click(nacInsurancePage.primaryPharmacyBtns.save.selector);
    const textInputs = nacInsurancePage.primaryPharmacyInputs;
    await checkRequiredFields(t, { textInputs }, taker);
});

test('Invalid - Primary Medical - Phone', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/invalid-primary-med-phone');

    await waitForPageToLoad(t);

    await t.click(nacInsurancePage.mainInsuranceBtns.medicalExpansionHeader.selector);
    const errorMessages = {
        areaCode0: 'Insurance Phone must be a 10 digit phone number',
        areaCode1: 'Insurance Phone must be a 10 digit phone number',
        exchangeCode0: 'Insurance Phone must be a 10 digit phone number',
        exchangeCode1: 'Insurance Phone must be a 10 digit phone number',
    };
    await checkInvalidValues(t, nacInsurancePage.primaryMedicalInputs.phone, errorMessages, taker);
});

test('Invalid - Secondary Medical - Phone', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/invalid-secondary-med-phone');

    await waitForPageToLoad(t);

    // fill out primary medical
    await t.click(nacInsurancePage.mainInsuranceBtns.medicalExpansionHeader.selector);
    await fillTextForm(t, nacInsurancePage.primaryMedicalInputs, new MedicalInsuranceItem());
    await t.click(nacInsurancePage.primaryMedicalBtns.save.selector);

    // test secondary medical invalid phone
    await t.click(nacInsurancePage.mainInsuranceBtns.medicalAddSecondary.selector);
    const errorMessages = {
        areaCode0: 'Insurance Phone must be a 10 digit phone number',
        areaCode1: 'Insurance Phone must be a 10 digit phone number',
        exchangeCode0: 'Insurance Phone must be a 10 digit phone number',
        exchangeCode1: 'Insurance Phone must be a 10 digit phone number',
    };
    await checkInvalidValues(t, nacInsurancePage.secondaryMedicalInputs.phone, errorMessages, taker);
});

test('Invalid - Primary Pharmacy - Member ID', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/invalid-primary-pharma-memberID');

    await waitForPageToLoad(t);

    await t.click(nacInsurancePage.mainInsuranceBtns.pharmacyExpansionHeader.selector);
    const errorMessages = {
        alphaNumeric: 'Rx Member ID must be only numbers',
    };
    await checkInvalidValues(t, nacInsurancePage.primaryPharmacyInputs.memberId, errorMessages, taker);
});

test('Next & Successful', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/insurance/next-success');

    await waitForPageToLoad(t);

    // fill out medical insurers
    await t.click(nacInsurancePage.mainInsuranceBtns.medicalExpansionHeader.selector);
    await fillTextForm(t, nacInsurancePage.primaryMedicalInputs, new MedicalInsuranceItem());
    await t.click(nacInsurancePage.primaryMedicalBtns.save.selector).click(nacInsurancePage.mainInsuranceBtns.medicalAddSecondary.selector);
    await fillTextForm(t, nacInsurancePage.secondaryMedicalInputs, new MedicalInsuranceItem());
    await t.click(nacInsurancePage.secondaryMedicalBtns.save.selector);

    // fill out primary pharmacy insurer
    await t.click(nacInsurancePage.mainInsuranceBtns.pharmacyExpansionHeader.selector);
    await fillTextForm(t, nacInsurancePage.primaryPharmacyInputs, new PharmacyInsuranceItem());
    await t.click(nacInsurancePage.primaryPharmacyBtns.save.selector);

    await taker.takeFullpageScreenshot();

    await t.click(nacInsurancePage.navBtns.next.selector);
    await checkPath('/need-a-card/success');
});
