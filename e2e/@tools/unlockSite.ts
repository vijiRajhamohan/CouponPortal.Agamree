import { ClientFunction } from 'testcafe';
import { waitForPageToLoad } from './waitForPageToLoad'
// bypasses tc-password-protect middleware
export default async function unlockSite(t: TestController) {
    await waitForPageToLoad(t)
    await ClientFunction(() => {
        const lockEnabled = (window as any).$nuxt.context.env.lockEnabled === 'true'
        if (!lockEnabled) return
        (window as any).$nuxt.context.env.lockEnabled = false;
        const { $router } = (window as any).$nuxt
        $router.push({ path: $router.history.current.query.previousPath })
    })();
}
