/* eslint-disable no-console */
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';
import { ISelectors } from '../@types/selectors';

export async function visibleAll(t: TestController, selectors: ISelectors) {
    await waitForPageToLoad(t);
    console.log('Visible All Check');
    for (const [selectorName, selectorObj] of Object.entries(selectors)) {
        await t.expect(selectorObj.selector.visible).ok(`${selectorName}: failed`);
        console.log(`${selectorName}: passed`);
    }
    console.log('\n');
}
