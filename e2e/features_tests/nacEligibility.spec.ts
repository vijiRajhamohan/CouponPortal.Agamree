// import page objects
import nacEligibilityPage from '../../page-objects/nacEligibilityPage';

// import tools
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import { checkPath } from '../@tools/checkPath';
import checkRequiredFields from '../@tools/checkRequiredFields';
import { ITestEligibilityOptions, testEligibility } from '../@tools/testEligibility';
import unlockSite from '../@tools/unlockSite';

// set page url (used in test fixture plus testEligibility function)
const url = testUrl('/need-a-card/eligibility');

// create test fixture
fixture`NAC Eligibility`.page(url).beforeEach(async t => {
    await unlockSite(t);
});

test('Patient - Eligibility - Required', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/eligibility');
    await t.click(nacEligibilityPage.buttons.next.selector);
    const radioQuestions = nacEligibilityPage.radioQuestions;
    await checkRequiredFields(t, { radioQuestions }, taker);
});

test('Patient - Eligibility - Back', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/eligibility');
    await waitForPageToLoad(t);
    await t.click(nacEligibilityPage.buttons.back.selector);
    await checkPath('/');
    await taker.takeFullpageScreenshot('Back');
});

test('Patient Eligibility - Test Eligible, Ineligible Answers, Next', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/eligibility/test-eligibility');
    const options: ITestEligibilityOptions = {
        t,
        url,
        questions: nacEligibilityPage.radioQuestions,
        nextBtn: nacEligibilityPage.buttons.next,
        ineligiblePath: '/rejection',
        eligiblePath: '/need-a-card/patient-information',
        taker,
    };
    await testEligibility(options);
});
