import { ClientFunction } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function clearState(t: TestController) {
    try {
        await waitForPageToLoad(t);
        await clearStateFunction();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
}
const clearStateFunction = ClientFunction(function() {
    return Promise.all([(window as any).$nuxt.$store.dispatch('CLEAR')]);
});
