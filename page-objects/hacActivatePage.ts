// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';
import { ITextInputs } from '../e2e/@types/forms';

class HacActivatePage {
    buttons: ISelectors = {
        back: {
            selector: VueSelector('ref:btn_back'),
        },
        next: {
            selector: VueSelector('ref:btn_next'),
        },
    };

    textInputs: ITextInputs = {
        memberNumber: {
            selector: VueSelector('ref:input_memberNumber'),
            required: true,
            invalidValues: {
                tooShort: '23434342',
            },
        },
    };
}

export default new HacActivatePage();
