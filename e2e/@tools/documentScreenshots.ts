import { ClientFunction } from 'testcafe';
import { IncrementalScreenshotTaker } from './takeBrowserScreenshot';
import { scrollTo } from './scrollTo';

export const getWindowHeight = ClientFunction(() => window.innerHeight);
export const getScrollTop = ClientFunction(() => document.querySelectorAll('html')[0].scrollTop);
export const getDocumentHeight = ClientFunction(() => document.body.clientHeight);
export const getFixedFooterHeight = ClientFunction(() => {
    const footer = document.querySelector('.fixed-footer');
    return footer ? footer.clientHeight : 0;
});

export async function takeDocumentScreenshot(screenshot: IncrementalScreenshotTaker) {
    let count = 0;
    let current = 0;
    await scrollTo(0);
    await screenshot.takeScreenshot();
    while (count < 20 && (await getDocumentHeight()) > (await getScrollTop()) + (await getWindowHeight())) {
        const next = await scrollTo((await getScrollTop()) + (await getWindowHeight()) - (await getFixedFooterHeight()));
        if (current > 0 && current === next) break;
        current = next;
        await screenshot.takeScreenshot();
        count++;
    }
    if (count > 15) {
        // eslint-disable-next-line no-console
        console.error('may have had an issue taking a document screenshot...');
    }
    await screenshot.takeScreenshot();
    await scrollTo(0);
}
