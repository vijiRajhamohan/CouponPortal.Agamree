// import page objects
import nacSuccessPage from '../../page-objects/nacSuccessPage';

// import test tools
import { testUrl } from '../@tools/url';
import { visibleAll } from '../@tools/visibleAll';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

fixture`NAC Success`.page(testUrl('/need-a-card/success')).beforeEach(async t => {
    await unlockSite(t);
});

test('NAC - Success Page - Check', async t => {
    await visibleAll(t, nacSuccessPage.messages);

    await visibleAll(t, nacSuccessPage.card);

    await visibleAll(t, nacSuccessPage.buttons);

    const screenshot = new IncrementalScreenshotTaker(t, '/features/pages/need-a-card/success');

    await screenshot.takeFullpageScreenshot('NAC-Success');
});
