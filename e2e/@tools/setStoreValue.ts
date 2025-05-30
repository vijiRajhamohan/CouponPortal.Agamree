import { ClientFunction } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad';

// note: make sure store modules are saved to browser session in ~/store/index.ts
export default async function(t: TestController, storeModule: string, mutation: string, newValue: any, reloadPath?: string) {
    await waitForPageToLoad(t);
    await ClientFunction((storeModule: string, mutation: string, newValue: any) => {
        return new Promise((resolve, reject) => {
            (window as any).$nuxt.$store.commit(`${storeModule}/${mutation}`, newValue);
            resolve();
        });
    })(storeModule, mutation, newValue);
    await ClientFunction((reloadPath?: string) => {
        return new Promise((resolve, reject) => {
            reloadPath ? (window as any).$nuxt._router.push({ path: reloadPath }) : window.location.reload();
            resolve();
        });
    })(reloadPath);
}
