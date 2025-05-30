// import page objects
import homePage from '../../page-objects/homePage';

// import test tools
import { testUrl } from '../@tools/url';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import { visibleAll } from '../@tools/visibleAll';
import { checkAttribute } from '../@tools/checkAttribute';
import { checkPath } from '../@tools/checkPath';
import { IncrementalScreenshotTaker } from '../@tools/takeBrowserScreenshot';
import unlockSite from '../@tools/unlockSite';

fixture`Home`.page(testUrl('/')).beforeEach(async t => {
    await unlockSite(t);
});

test('Home - Visible All', async t => {
    const taker = new IncrementalScreenshotTaker(t, '/features/pages/home');

    await visibleAll(t, homePage.buttons);
    await visibleAll(t, homePage.links);
    await visibleAll(t, homePage.images);

    await taker.takeFullpageScreenshot('Visible-All');
});

test('Home - Attribute Checks', async t => {
    // test src attribute for images
    // const imgSrcs = {
    //     headerLogo: '/logo.png'
    // };
    // await checkAttribute(homePage.images, 'src', imgSrcs)

    // test href attrute for links
    const linkHrefs = {
        headerLogo: '/',
        footerPrivacyPolicy: '#',
        footerISI: '#',
        footerTerms: '#',
    };
    await checkAttribute(homePage.links, 'href', linkHrefs);
});

test('Home - Start HAC', async t => {
    await waitForPageToLoad(t);

    await t.click(homePage.buttons.hac.selector);

    await checkPath('/have-a-card');
});

test('Home - Start NAC', async t => {
    await waitForPageToLoad(t);

    await t.click(homePage.buttons.nac.selector);

    await checkPath('/need-a-card/eligibility');
});
