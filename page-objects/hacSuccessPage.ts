// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';

class HacSuccessPage {
    messages: ISelectors = {
        success: {
            selector: Selector('[data-test="message_h1"]').withText('SUCCESS!'),
        },
    };

    card: ISelectors = {
        image: {
            selector: Selector('[data-test="card_img"]'),
        },
        memberNumber: {
            selector: Selector('[data-test="card_memberNumber"]'),
        },
        expiration: {
            selector: Selector('[data-test="card_expiration"]'),
        },
    };

    buttons: ISelectors = {
        download: {
            selector: VueSelector('ref:btn_pdfDownload'),
        },
    };
}

export default new HacSuccessPage();
