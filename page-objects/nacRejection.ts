// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';

class NacRejectionPage {
    messages: ISelectors = {
        rejection: {
            selector: Selector('[data-test="message_strong_rejection"]').withText('not eligible'),
        },
    };
}

export default new NacRejectionPage();
