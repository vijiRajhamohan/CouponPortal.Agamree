// import page objects
import hacPage from '../../page-objects/hacActivatePage';

// import test tools
import { testUrl } from '../@tools/url';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import checkRequiredFields from '../@tools/checkRequiredFields';
import checkInvalidValues from '../@tools/checkInvalidValues';
import { checkPath } from '../@tools/checkPath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

// import test data
import { pharmacyMN } from '../@data/shared/memberNumbers';

fixture`HAC Activate`.page(testUrl('/have-a-card')).beforeEach(async t => {
    await unlockSite(t);
});

test('Back Button', async t => {
    await waitForPageToLoad(t);
    await t.click(hacPage.buttons.back.selector);
    await checkPath('/');
});

test('Required Fields', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/have-a-card/activate');
    await t.click(hacPage.buttons.next.selector);
    const textInputs = hacPage.textInputs;
    await checkRequiredFields(t, { textInputs }, taker);
});

test('Member Number - Invalid', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/have-a-card/activate/invalid');
    const errorMessages = {
        tooShort: 'Your 11-Digit Member Number cannot be shorter than 11 characters',
    };
    await checkInvalidValues(t, hacPage.textInputs.memberNumber, errorMessages, taker);
});

test('Next & Success', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/have-a-card/activate');

    await waitForPageToLoad(t);
    await t.typeText(hacPage.textInputs.memberNumber.selector, pharmacyMN.number);

    await t.click(hacPage.buttons.next.selector);
    await checkPath('/have-a-card/success');

    await taker.takeFullpageScreenshot('Next-Success');
});
