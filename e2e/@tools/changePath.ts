import { ClientFunction, t } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function changePath(path: string) {
    await waitForPageToLoad(t);
    return ClientFunction((path: string) => {
        // disable print pop-up
        window.print = function() {};
        // change route
        (window as any).$nuxt._router.push({ path });
    })(path);
}
