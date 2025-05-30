// import test tools
import { changePath } from '../@tools/changePath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import { testUrl } from '../@tools/url';
import unlockSite from '../@tools/unlockSite';

// import page objects
import homePage from '../../page-objects/homePage';

fixture`patient-search_screenshots`.page(testUrl('/')).beforeEach(async t => {
    await unlockSite(t);
});

test('Patient Search - Screenshots', async t => {
    // save in pdf folder for pdf generator
    const taker = new IncrementalScreenshotTaker(t, '/pdf/02_patient-search');

    // // home - start Patient Search
    // await t.rightClick(homePage.buttons.PatientSearch.selector)
    // await taker.takeFullpageScreenshot('Home - Start Patient Search');

    // Patient Search
    await changePath('/patient/patientSearch');
    await taker.takeFullpageScreenshot('Patient Search');
});
