import { ClientFunction } from 'testcafe';
import { waitForPageToLoad } from '../@tools/waitForPageToLoad';

export default async function hideFloatingFooter(t: TestController) {
    await waitForPageToLoad(t);
    await ClientFunction(() => {
        const css = `
        #fixed-footer {
            display: none;
        }
        `;
        const head = document.head || document.querySelectorAll('head')[0];
        const style = document.createElement('style');
        head.append(style);
        style.append(document.createTextNode(css));
    })();
}
