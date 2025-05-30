/* eslint-disable jest/no-disabled-tests */
// import testcafe functions
import { t } from 'testcafe';

// import logger tools
import { requestLogger } from '../@tools/requestLogger';
import { RequestGenerator } from '../@tools/requestGenerator';
// TODO: choose between edb and coupon - remove unused
import { edbEndpoints } from '../@data/enterprise/endpoints';
import { couponEndpoints } from '../@data/coupon/endpoints';

// import test tools
import { checkPath } from '../@tools/checkPath';
import { fillTextForm } from '../@tools/fillForm';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

// import page objects
import homePage from '../../page-objects/homePage';
import hacActivatePage from '../../page-objects/hacActivatePage';
import hacSuccessPage from '../../page-objects/hacSuccessPage';

// import data helpers
import Patient from '../@data/helpers/patient';
import { pharmacyMNPattern, medicalMNPattern } from '../@data/shared/memberNumbers';
import { rolling365 } from '../@data/shared/dates';

// import env variables
import env from '../../envConfig';

// create request hooks
// TODO: choose between edbEndpoints and couponEndpoints from above imports- defaulted to edbEndpoints
const requestLoggers = Object.values(edbEndpoints).map(url => requestLogger(url));
const responseGenerators = Object.values(edbEndpoints).map((url, index) => new RequestGenerator(t, url, requestLoggers[index]));
// const requestLoggers = Object.values(couponEndpoints).map(url => requestLogger(url));
// const responseGenerators = Object.values(couponEndpoints).map((url, index) => new RequestGenerator(t, url, requestLoggers[index]));

fixture`HAC Happy Integration Test`
    .page(testUrl('/'))
    .requestHooks(...requestLoggers, ...responseGenerators)
    .beforeEach(async t => {
        await unlockSite(t);
        for (const gen in responseGenerators) {
            responseGenerators[gen].t = t;
        }
    });

test('HAC - Happy path', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/integration/hac');
    await taker.takeFullpageScreenshot('Home');
    await t.click(homePage.buttons.hac.selector);

    // activate page
    // NOTE: run testcafe command with qa | uat | prod to use env value
    const memberNumber = (env && env.MEMBER_NUMBER) || '12345678901';
    await t.typeText(hacActivatePage.textInputs.memberNumber.selector, memberNumber);
    await taker.takeFullpageScreenshot('HAC Activate Page - Filled');
    await t.click(hacActivatePage.buttons.next.selector);

    // success
    await checkPath('/have-a-card/success');

    await t.expect(hacSuccessPage.card.memberNumber.selector.withText(pharmacyMNPattern).visible).ok();
    await t.expect(hacSuccessPage.card.expiration.selector.withText(String(rolling365)).visible).ok();
    await taker.takeFullpageScreenshot('HAC Success Page');
});
