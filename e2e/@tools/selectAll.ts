import { ISelector } from '../@types/selectors';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function selectAll(t: TestController, formArray: ISelector[]) {
    await waitForPageToLoad(t);
    for (const element of formArray) {
        await t.click(element.selector);
    }
}
