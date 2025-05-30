/* eslint-disable jest/no-disabled-tests */

// import logger tools
import { ClientFunction } from 'testcafe';

// import test tools
import { changePath } from '../@tools/changePath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

// import data helpers
import { rolling365 } from '../@data/shared/dates';

// import page objects
import homePage from '../../page-objects/homePage';
import nacEligibilityPage from '../../page-objects/nacEligibilityPage';
import nacPatientPage from '../../page-objects/nacPatientPage';
import nacSuccessPage from '../../page-objects/nacSuccessPage';

fixture`NAC_screenshots`.page(testUrl('/')).beforeEach(async t => {
    await unlockSite(t);
});

test('NAC - Screenshots', async t => {
    // save in pdf folder for pdf generator
    const taker = new IncrementalScreenshotTaker(t, '/pdf/04_nac');

    // Home - start NAC
    await t.rightClick(homePage.buttons.nac.selector);
    await taker.takeFullpageScreenshot('Home - Start NAC');

    // NAC Eligibility
    await changePath('/need-a-card/eligibility');
    await taker.takeFullpageScreenshot('NAC Eligibility');
    // required
    await t.click(nacEligibilityPage.buttons.next.selector);
    await taker.takeFullpageScreenshot('NAC Eligibility - Required');

    // NAC Patient Information
    await changePath('/need-a-card/patient-information');
    await taker.takeFullpageScreenshot('NAC Patient Information');
    // required
    await t.click(nacPatientPage.buttons.next.selector);
    await taker.takeFullpageScreenshot('NAC Patient Information - Required');

    // NAC Success
    await changePath('/need-a-card/success');
    await taker.takeFullpageScreenshot('NAC Success');
});
