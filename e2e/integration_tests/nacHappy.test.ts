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
import { answerEligibilityQuestions, fillTextForm } from '../@tools/fillForm';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

// import data helpers
import Patient from '../@data/helpers/patient';
import { pharmacyMNPattern, medicalMNPattern } from '../@data/shared/memberNumbers';
import { rolling365 } from '../@data/shared/dates';

// import page objects
import homePage from '../../page-objects/homePage';
import nacEligibilityPage from '../../page-objects/nacEligibilityPage';
import nacPatientPage from '../../page-objects/nacPatientPage';
import nacSuccessPage from '../../page-objects/nacSuccessPage';

// create request hooks
// TODO: Decide between enterprise/coupon endpoints - remove unused loggers/generators
const requestLoggers = Object.values(edbEndpoints).map(url => requestLogger(url));
const responseGenerators = Object.values(edbEndpoints).map((url, index) => new RequestGenerator(t, url, requestLoggers[index]));
// const requestLoggers = Object.values(couponEndpoints).map(url => requestLogger(url));
// const responseGenerators = Object.values(couponEndpoints).map((url, index) => new RequestGenerator(t, url, requestLoggers[index]));

fixture`NAC Happy Integration Test`
    .page(testUrl('/'))
    .requestHooks(...requestLoggers, ...responseGenerators)
    .beforeEach(async t => {
        await unlockSite(t);
        for (const gen in responseGenerators) {
            responseGenerators[gen].t = t;
        }
    });

test('NAC - Happy path', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/integration/nac');
    await taker.takeFullpageScreenshot();
    await t.click(homePage.buttons.nac.selector);

    // eligibility questions
    await answerEligibilityQuestions(t, nacEligibilityPage.radioQuestions);
    await taker.takeFullpageScreenshot();
    await t.click(nacEligibilityPage.buttons.next.selector);

    // patient information
    await fillTextForm(t, nacPatientPage.textInputs, new Patient());
    await taker.takeFullpageScreenshot();
    await t.click(nacPatientPage.buttons.next.selector);

    // success
    await checkPath('/need-a-card/success');

    await t.expect(nacSuccessPage.card.memberNumber.selector.withText(pharmacyMNPattern).visible).ok();
    await t.expect(nacSuccessPage.card.expiration.selector.withText(String(rolling365)).visible).ok();
    await taker.takeFullpageScreenshot();
});
