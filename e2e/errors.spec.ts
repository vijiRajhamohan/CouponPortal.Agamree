import { IncrementalScreenshotTaker } from './@tools/takeBrowserScreenshot';
import { testUrl } from './@tools/url';
import { waitForPageToLoad } from './@tools/waitForPageToLoad';

fixture`Errors`.page(testUrl('/'));

test('Should load error 400', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/error-pages/400/');
    await t.navigateTo(testUrl('/errors/400'));
    await waitForPageToLoad(t);

    await taker.takeFullpageScreenshot('400 error');
});

test('Should load error 401', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/error-pages/401/');
    await t.navigateTo(testUrl('/errors/401'));
    await waitForPageToLoad(t);

    await taker.takeFullpageScreenshot('401 error');
});

test('Should load error 403', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/error-pages/403/');
    await t.navigateTo(testUrl('/errors/403'));
    await waitForPageToLoad(t);

    await taker.takeFullpageScreenshot('403 error');
});

test('Should load error 404', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/error-pages/404/');
    await t.navigateTo(testUrl('/errors/404'));
    await waitForPageToLoad(t);

    await taker.takeFullpageScreenshot('404 error');
});

test('Should load error 500', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/error-pages/500/');
    await t.navigateTo(testUrl('/errors/500'));
    await waitForPageToLoad(t);

    await taker.takeFullpageScreenshot('500 error');
});
