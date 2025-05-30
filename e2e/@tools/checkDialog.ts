import { t } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';
import { ISelector } from '../@types/selectors';
import { waitForPageToLoad } from './waitForPageToLoad';

export async function checkDialog(dialogOpen: ISelector, dialogClose: ISelector) {
    await waitForPageToLoad(t);
    await t.click(dialogOpen.selector);

    const dialog = VueSelector().find('.v-dialog');
    await t.expect(dialog.visible).ok();

    await t.click(dialogClose.selector);
    await t.expect(dialog.visible).notOk();
}
