import { Selector } from 'testcafe';

export async function waitForPageToLoad(t: TestController) {
    return t
        .expect(Selector('#pre-loader').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('#nuxt-spinner').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('[role="progressbar"]').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('.page-enter').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('.page-enter-active').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('.page-leave').exists)
        .notOk('', { timeout: 30000 })
        .expect(Selector('.page-leave-active').exists)
        .notOk('', { timeout: 30000 });
}
