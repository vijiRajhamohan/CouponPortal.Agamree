import { ClientFunction, t } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function checkPath(expPath: string, delay = 5000) {
    // delay for checking path in ms
    await t.wait(delay);

    await waitForPageToLoad(t);
    const path = await ClientFunction(() => (window as any).$nuxt._router.history.current.path)();
    const regex = new RegExp(`^${expPath}/?$`);
    await t.expect(regex.test(path)).ok(`expected ${path} to equal ${expPath}`);
}
