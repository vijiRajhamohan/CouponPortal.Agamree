// import test tools
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

fixture`home_screenshots`.page(testUrl('/')).beforeEach(async t => {
    await unlockSite(t);
});

test('Home - Screenshots', async t => {
    // save in pdf folder for pdf generator
    const taker = new IncrementalScreenshotTaker(t, '/pdf/01_home');
    await taker.takeFullpageScreenshot('Home');
});
