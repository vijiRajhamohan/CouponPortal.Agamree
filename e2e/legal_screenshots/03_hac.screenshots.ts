/* eslint-disable jest/no-disabled-tests */
// import testcafe functions
import { ClientFunction } from 'testcafe';

// import test tools
import { changePath } from '../@tools/changePath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

// import page objects
import homePage from '../../page-objects/homePage';
import hacActivatePage from '../../page-objects/hacActivatePage';
import hacSuccessPage from '../../page-objects/hacSuccessPage';

// import data helpers
import { rolling365 } from '../@data/shared/dates';

fixture`HAC_screenshots`.page(testUrl('/')).beforeEach(async t => {
    await unlockSite(t);
});

test('HAC - Screenshots', async t => {
    // save in pdf folder for pdf generator
    const taker = new IncrementalScreenshotTaker(t, '/pdf/03_hac');

    // home - start HAC
    await t.rightClick(homePage.buttons.hac.selector);
    await taker.takeFullpageScreenshot('Home - Start HAC');

    // activate page
    await changePath('/have-a-card');
    await taker.takeFullpageScreenshot('HAC Activation');
    // required
    await t.click(hacActivatePage.buttons.next.selector);
    await taker.takeFullpageScreenshot('HAC Activation - Required');

    // success
    await changePath('/have-a-card/success');
    await taker.takeFullpageScreenshot('HAC Success');
});
