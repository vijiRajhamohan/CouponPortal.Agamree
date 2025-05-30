// import selector functions
import { Selector } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// import test types
import { ISelectors } from '../e2e/@types/selectors';
import { ITextInputs, IMultiChoiceQuestions } from '../e2e/@types/forms';

// import fake data
import randomizers from '../e2e/@data/helpers/randomizers';

class NacPatientPage {
    messages: ISelectors = {
        header: {
            selector: Selector('[data-test="message_h1"]').withText('PATIENT INFORMATION'),
        },
    };

    buttons: ISelectors = {
        back: {
            selector: VueSelector('ref:btn_back'),
        },
        next: {
            selector: VueSelector('ref:btn_next'),
        },
    };

    textInputs: ITextInputs = {
        // patient input groups
        firstName: {
            selector: VueSelector('ref:patient_firstName'),
            required: true,
        },
        lastName: {
            selector: VueSelector('ref:patient_lastName'),
            required: true,
        },
        addressOne: {
            selector: VueSelector('ref:patient_addresses_0_addressOne'),
            required: true,
        },
        addressTwo: {
            selector: VueSelector('ref:patient_addresses_0_addressTwo'),
            required: false,
        },
        zip: {
            selector: VueSelector('ref:patient_addresses_0_zip'),
            required: true,
        },
        city: {
            selector: VueSelector('ref:patient_addresses_0_city'),
            required: true,
            isFilled: true,
        },
        state: {
            selector: VueSelector('ref:patient_addresses_0_state'),
            required: true,
            isFilled: true,
        },
        gender: {
            selector: VueSelector('ref:patient_gender'),
            required: true,
            isEntered: true,
        },
        dateOfBirth: {
            selector: VueSelector('ref:patient_dateOfBirth'),
            required: true,
            invalidValues: {
                notADate: '13/13/1980',
                notBorn: randomizers.getFutureDate(),
                isAVampire: randomizers.getVampireDate(),
                isAMinor: randomizers.getDob(0, 18),
            },
            datepicker: false,
        },
        email: {
            selector: VueSelector('ref:patient_emailAddresses_0_address'),
            required: false,
            invalidValues: {
                missingUsername: '@gmail.com',
                missingAt: 'username_gmail.com',
                missingDomain: 'username@',
                missingDomainServer: 'username@.com',
                missingDomainExtension: 'username@gmail',
            },
            isVisibleConditions: {
                caregiver: false,
            },
        },
        phoneNumber: {
            selector: VueSelector('ref:patient_phoneNumbers_0_phoneNumber'),
            required: false,
            invalidValues: {
                areaCode0: '0999999999',
                areaCode1: '1999999999',
                exchangeCode0: '999099999',
                exchangeCode1: '999199999',
            },
            isVisibleConditions: {
                caregiver: false,
            },
        },
        cellPhone: {
            selector: VueSelector('ref:patient_phoneNumbers_1_phoneNumber'),
            required: true,
            invalidValues: {
                areaCode0: '0999999999',
                areaCode1: '1999999999',
                exchangeCode0: '999099999',
                exchangeCode1: '999199999',
            },
            isVisibleConditions: {
                consentText: true,
                consentMarketingContactPreferenceText: true,
            },
            isFilledConditions: {
                cellSameAsAbove: true,
            },
        },
        // caregiver input groups
        caregiverFirstName: {
            selector: VueSelector('ref:caregiver_firstName'),
            required: true,
            isVisibleConditions: {
                caregiver: true,
            },
        },
        caregiverLastName: {
            selector: VueSelector('ref:caregiver_lastName'),
            required: true,
            isVisibleConditions: {
                caregiver: true,
            },
        },
        caregiverEmail: {
            selector: VueSelector('ref:caregiver_emailAddresses_0_address'),
            required: false,
            isVisibleConditions: {
                caregiver: true,
            },
        },
        caregiverPhoneNumber: {
            selector: VueSelector('ref:caregiver_phoneNumbers_0_phoneNumber'),
            required: false,
            isVisibleConditions: {
                caregiver: true,
            },
        },
        caregiverZip: {
            selector: VueSelector('ref:caregiver_addresses_0_zip'),
            required: true,
            isVisibleConditions: {
                caregiver: true,
            },
        },
    };

    radioQuestions: IMultiChoiceQuestions = {
        caregiver: {
            selector: VueSelector('ref:survey_caregiver_question'),
            required: true,
            options: {
                yes: {
                    selector: VueSelector('ref:survey_caregiver_answerYes').find('input'),
                },
                no: {
                    selector: VueSelector('ref:survey_caregiver_answerNo').find('input'),
                },
            },
            isVisibleConditions: {
                drawerConditionalFields: true,
            },
        },
    };

    checkboxQuestions: IMultiChoiceQuestions = {
        patientConsentText: {
            selector: VueSelector('ref:survey_patientConsentText_question'),
            required: false,
            options: {
                yes: {
                    selector: VueSelector('ref:survey_patientConsentText_answerYes').find('input'),
                },
            },
            isVisibleConditions: {
                drawerMarketingOptIn: true,
            },
        },
        cellSameAsAbove: {
            selector: VueSelector('ref:patientCellSameAsAbove_question'),
            required: false,
            options: {
                yes: {
                    selector: VueSelector('ref:patientCellSameAsAbove_answerYes').find('input'),
                },
            },
            isVisibleConditions: {
                consentText: true,
            },
        },
        patientConsentMarketing: {
            selector: VueSelector('ref:survey_patientConsentMarketing_question'),
            required: false,
            options: {
                yes: {
                    selector: VueSelector('ref:survey_patientConsentMarketing_answerYes').find('input'),
                },
            },
            isVisibleConditions: {
                drawerMarketingOptIn: true,
            },
        },
        contactPreferences: {
            selector: VueSelector('ref:account_contactPreferences'),
            required: true,
            options: {
                text: {
                    selector: VueSelector('ref:account_contactPreferences_0_contactInfoTypeText').find('input'),
                },
                phone: {
                    selector: VueSelector('ref:account_contactPreferences_1_contactInfoTypePhone').find('input'),
                },
                email: {
                    selector: VueSelector('ref:account_contactPreferences_2_contactInfoTypeEmail').find('input'),
                },
                mail: {
                    selector: VueSelector('ref:account_contactPreferences_3_contactInfoTypeMail').find('input'),
                },
            },
            isVisibleConditions: {
                consentMarketing: true,
            },
        },
    };
}

export default new NacPatientPage();
