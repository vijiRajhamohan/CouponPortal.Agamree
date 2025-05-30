// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';
import { IEligibilityQuestions } from '../e2e/@types/forms';

class NacEligibilityPage {
    buttons: ISelectors = {
        back: {
            selector: Selector('.row-next-back a.v-btn'),
        },
        next: {
            selector: Selector('.row-next-back button.v-btn'),
        },
    };

    radioQuestions: IEligibilityQuestions = {
        medication: {
            selector: VueSelector('ref:eligibility_1_question'),
            required: true,
            options: {
                yes: {
                    selector: VueSelector('ref:eligibility_1_answerYes').find('input'),
                    isEligible: false,
                },
                no: {
                    selector: VueSelector('ref:eligibility_1_answerNo').find('input'),
                    isEligible: true,
                },
            },
        },
        citizen: {
            selector: VueSelector('ref:eligibility_2_question'),
            required: true,
            options: {
                yes: {
                    selector: VueSelector('ref:eligibility_2_answerYes').find('input'),
                    isEligible: true,
                },
                no: {
                    selector: VueSelector('ref:eligibility_2_answerNo').find('input'),
                    isEligible: false,
                },
            },
        },
        age: {
            selector: VueSelector('ref:eligibility_3_question'),
            required: true,
            options: {
                yes: {
                    selector: VueSelector('ref:eligibility_3_answerYes').find('input'),
                    isEligible: true,
                },
                no: {
                    selector: VueSelector('ref:eligibility_3_answerNo').find('input'),
                    isEligible: false,
                },
            },
        },
    };
}

export default new NacEligibilityPage();
