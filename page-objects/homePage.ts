// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';

class HomePage {
    buttons: ISelectors = {
        hac: {
            selector: VueSelector('ref:btn_hac'),
        },
        nac: {
            selector: VueSelector('ref:btn_nac'),
        },
    };

    links: ISelectors = {
        headerLogo: {
            selector: Selector('[data-test="link_header_logo"]'),
        },
        footerPrivacyPolicy: {
            selector: Selector('[data-test="link_footer_privacy"]'),
        },
        footerISI: {
            selector: Selector('[data-test="link_footer_isi"]'),
        },
        footerTerms: {
            selector: Selector('[data-test="link_footer_terms"]'),
        },
    };

    images: ISelectors = {
        headerLogo: {
            selector: Selector('[data-test="img_header_logo"]'),
        },
    };
}

export default new HomePage();
