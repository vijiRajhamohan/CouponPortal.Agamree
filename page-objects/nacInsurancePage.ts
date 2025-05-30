// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';
import { ITextInputs } from '../e2e/@types/forms';

class InsurancePage {
    navBtns: ISelectors = {
        next: {
            selector: VueSelector('ref:btn_next'),
        },
        back: {
            selector: VueSelector('ref:btn_back'),
        },
    };

    mainInsuranceBtns: ISelectors = {
        medicalExpansionHeader: {
            selector: VueSelector('ref:medical_expansion-header'),
        },
        medicalAddSecondary: {
            selector: VueSelector('ref:medical_add-secondary'),
        },
        pharmacyExpansionHeader: {
            selector: VueSelector('ref:pharmacy_expansion-header'),
        },
    };

    primaryMedicalBtns: ISelectors = {
        save: {
            selector: VueSelector('ref:primary-medical_save'),
        },
        edit: {
            selector: VueSelector('ref:primary-medical_edit'),
        },
        clear: {
            selector: VueSelector('ref:primary-medical_clear'),
        },
        delete: {
            selector: VueSelector('ref:primary-medical_delete'),
        },
    };

    secondaryMedicalBtns: ISelectors = {
        save: {
            selector: VueSelector('ref:secondary-medical_save'),
        },
        edit: {
            selector: VueSelector('ref:secondary-medical_edit'),
        },
        clear: {
            selector: VueSelector('ref:secondary-medical_clear'),
        },
        delete: {
            selector: VueSelector('ref:secondary-medical_delete'),
        },
    };

    primaryPharmacyBtns: ISelectors = {
        save: {
            selector: VueSelector('ref:primary-pharmacy_save'),
        },
        edit: {
            selector: VueSelector('ref:primary-pharmacy_edit'),
        },
        clear: {
            selector: VueSelector('ref:primary-pharmacy_clear'),
        },
        delete: {
            selector: VueSelector('ref:primary-pharmacy_delete'),
        },
    };

    primaryMedicalInputs: ITextInputs = {
        state: {
            selector: VueSelector('ref:primary-medical_state'),
            required: true,
            isEntered: true,
        },
        carrier: {
            selector: VueSelector('ref:primary-medical_carrier'),
            required: true,
        },
        phone: {
            selector: VueSelector('ref:primary-medical_phone'),
            required: true,
            invalidValues: {
                areaCode0: '0999999999',
                areaCode1: '1999999999',
                exchangeCode0: '999099999',
                exchangeCode1: '999199999',
            },
        },
        firstName: {
            selector: VueSelector('ref:primary-medical_first-name'),
            required: true,
        },
        lastName: {
            selector: VueSelector('ref:primary-medical_last-name'),
            required: true,
        },
        planName: {
            selector: VueSelector('ref:primary-medical_plan-name'),
            required: false,
        },
        groupNumber: {
            selector: VueSelector('ref:primary-medical_group-number'),
            required: false,
        },
        policyNumber: {
            selector: VueSelector('ref:primary-medical_policy-number'),
            required: false,
        },
    };

    secondaryMedicalInputs: ITextInputs = {
        state: {
            selector: VueSelector('ref:secondary-medical_state'),
            required: true,
            isEntered: true,
        },
        carrier: {
            selector: VueSelector('ref:secondary-medical_carrier'),
            required: true,
        },
        phone: {
            selector: VueSelector('ref:secondary-medical_phone'),
            required: true,
            invalidValues: {
                areaCode0: '0999999999',
                areaCode1: '1999999999',
                exchangeCode0: '999099999',
                exchangeCode1: '999199999',
            },
        },
        firstName: {
            selector: VueSelector('ref:secondary-medical_first-name'),
            required: true,
        },
        lastName: {
            selector: VueSelector('ref:secondary-medical_last-name'),
            required: true,
        },
        planName: {
            selector: VueSelector('ref:secondary-medical_plan-name'),
            required: false,
        },
        groupNumber: {
            selector: VueSelector('ref:secondary-medical_group-number'),
            required: false,
        },
        policyNumber: {
            selector: VueSelector('ref:secondary-medical_policy-number'),
            required: false,
        },
    };

    primaryPharmacyInputs: ITextInputs = {
        state: {
            selector: VueSelector('ref:primary-pharmacy_state'),
            isEntered: true,
            required: false,
        },
        pbmName: {
            selector: VueSelector('ref:primary-pharmacy_pbm-name'),
            required: true,
        },
        memberId: {
            selector: VueSelector('ref:primary-pharmacy_member-id'),
            required: true,
            invalidValues: {
                alphaNumeric: 'a1234567890',
            },
        },
        groupNumber: {
            selector: VueSelector('ref:primary-pharmacy_group-number'),
            required: false,
        },
        binNumber: {
            selector: VueSelector('ref:primary-pharmacy_bin-number'),
            required: false,
        },
        pcnNumber: {
            selector: VueSelector('ref:primary-pharmacy_pcn-number'),
            required: false,
        },
    };
}

export default new InsurancePage();
