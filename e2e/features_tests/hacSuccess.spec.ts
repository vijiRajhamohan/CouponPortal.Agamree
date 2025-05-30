// import page objects
import hacSuccessPage from '../../page-objects/hacSuccessPage';

// import test tools
import { testUrl } from '../@tools/url';
import { visibleAll } from '../@tools/visibleAll';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

fixture`HAC Success`.page(testUrl('/have-a-card/success')).beforeEach(async t => {
    await unlockSite(t);
});

test('HAC - Success Page - Visible All', async t => {
    await visibleAll(t, hacSuccessPage.messages);

    await visibleAll(t, hacSuccessPage.card);

    await visibleAll(t, hacSuccessPage.buttons);

    const taker = new IncrementalScreenshotTaker(t, '/features/pages/have-a-card/success');

    await taker.takeFullpageScreenshot('Visible-All');
});
