/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import moment, { Moment } from 'moment';
import { RuleDecl } from 'vue/types/options';
import { EnterpriseCoordinatorAccountServiceModelsAccountContactPreferenceModel } from '@trialcard/apigateway.models';
import { Watch } from 'vue-property-decorator';
import { LocationV1Api } from '@trialcard/apigateway.client/locationV1Api';
import { first } from 'lodash';
import { phone, zip, notInFuture, notAVampire, date, atLeast18YearsAgo } from '~/services/validations';
import EnrollmentModule from '~/store/enrollment';
import { Validate } from '~/validation/Validate';
import genders from '~/assets/genders';
import SurveyModule from '~/store/survey';
import states from '~/assets/states';
import LayoutModule from '~/store/layout';
const handleIsCareGiver = function(obj: RuleDecl, invert = false) {
    return function(this: PatientInformationModule): RuleDecl {
        return invert ? (!this.isCareGiver ? obj : {}) : this.isCareGiver ? obj : {};
    };
};
const requiredIfContactText = function(obj: RuleDecl) {
    return function(this: PatientInformationModule): RuleDecl {
        return this.contactText || this.doesAgreeTextMessage ? obj : { phone };
    };
};
const requireOneContactPreference = function(obj: RuleDecl) {
    return function(this: PatientInformationModule): RuleDecl {
        return !(this.contactText || this.contactEmail || this.contactPhone || this.contactRegularMail) && this.doesAgreeMarketing
            ? obj
            : {};
    };
};
const requireIsCareGiver = function(obj: RuleDecl) {
    return function(this: PatientInformationModule): RuleDecl {
        return this.layout.configuration.hasConditionalFields ? obj : {};
    };
};
const handleEmail = function(obj: RuleDecl, invert = false) {
    return function(this: PatientInformationModule): RuleDecl {
        const newObj = { ...obj };
        if (!(this.doesAgreeMarketing && this.contactEmail)) {
            delete newObj.required;
        }
        return invert ? (!this.isCareGiver ? newObj : {}) : this.isCareGiver ? newObj : {};
    };
};
const handlePhone = function(obj: RuleDecl, invert = false) {
    return function(this: PatientInformationModule): RuleDecl {
        const newObj = { ...obj };
        if (!(this.doesAgreeMarketing && this.contactPhone)) {
            delete newObj.required;
        }
        return invert ? (!this.isCareGiver ? newObj : {}) : this.isCareGiver ? newObj : {};
    };
};

@Component<PatientInformationModule>({})
export default class PatientInformationModule extends Vue {
    // Renderer for Jest - functional component
    render() {
        return null;
    }

    @Resolve
    public enrollment!: EnrollmentModule;

    @Resolve
    public survey!: SurveyModule;

    @Resolve
    public location!: LocationV1Api;

    @Resolve
    public layout!: LayoutModule;

    @Validate({ required, maxLength: maxLength(20) })
    public firstName = '' as string;
    @Validate({ required, maxLength: maxLength(20) })
    public lastName = '' as string;
    @Validate({ required, maxLength: maxLength(40) })
    public addressOne = '' as string;
    @Validate({ maxLength: maxLength(40) })
    public addressTwo = '' as string;
    @Validate({ required, date, notInFuture, notAVampire, atLeast18YearsAgo })
    public dateOfBirth = null as Moment | string | null;
    @Validate({ required, zip })
    public zip = '' as string;
    @Validate({ required, maxLength: maxLength(25) })
    public city = '' as string;
    @Validate({ required })
    public state = '' as string;
    @Validate({ required })
    public gender = '' as string;
    @Validate(handlePhone({ required, phone }, true))
    public phone = '' as string;
    @Validate(handleEmail({ required, email }, true))
    public email = '' as string;

    @Validate(requireIsCareGiver({ required }))
    public isCareGiver = this.enrollment.isCareGiver as boolean | null;
    @Validate(handleIsCareGiver({ required, maxLength: maxLength(20) }))
    public caregiverFirstName = '' as string;
    @Validate(handleIsCareGiver({ required, maxLength: maxLength(20) }))
    public caregiverLastName = '' as string;
    @Validate(handleIsCareGiver({ required, zip }))
    public caregiverZip = '' as string;
    @Validate(handlePhone({ required, phone }))
    public caregiverPhone = '' as string;
    @Validate(handleEmail({ required, email }))
    public caregiverEmail = '' as string;

    public genders = genders;
    public states = states;
    public isLoading = false;

    public doesAgreeMarketing = false;
    public doesAgreeTextMessage = false;

    @Validate(requireOneContactPreference({ required }))
    public contactText = null;
    @Validate(requireOneContactPreference({ required }))
    public contactPhone = null;
    @Validate(requireOneContactPreference({ required }))
    public contactEmail = null;
    @Validate(requireOneContactPreference({ required }))
    public contactRegularMail = null;
    @Validate(requiredIfContactText({ required, phone }))
    public cellPhone = '';

    public sameAsAbove = false;

    created() {
        window.addEventListener('beforeunload', this.enrollment.clearStore);
    }

    // Method that checks for "My cell phone number is the same as above" checked value and sets cellPhone and phone values equal
    checkSameNumber() {
        if (this.sameAsAbove) this.setCellNumber();
    }

    // sets cellPhone and phone values equal
    setCellNumber() {
        this.cellPhone = this.isCareGiver ? this.caregiverPhone : this.phone;
    }

    // toggles same as above checkbox value based on changes to cell phone value
    unCheckSameAsAbove() {
        // sets checkbox value based on whether the cellPhone and phone are the same.
        this.sameAsAbove = this.cellPhone === this.phone;
    }

    @Watch('zip')
    public async watchZip(code: string) {
        if (!code || code.length < 5) return;
        const result = await this.location.getCitiesByZip(code);
        const location = first(result.data.data);
        if (location) {
            this.city = location.cityName!;
            this.state = location.stateAbbr!;
        }
    }

    @Watch('enrollment.patientInformationData', { immediate: true, deep: true })
    watchPatient(values: typeof EnrollmentModule.prototype.patientInformationData) {
        const {
            firstName,
            lastName,
            emailAddresses,
            dateOfBirth,
            addresses,
            gender,
            phoneNumbers,
        } = this.enrollment.patientInformationData;
        const enrollmentObj = {
            ...values,
            firstName,
            lastName,
            email: (emailAddresses.length > 0 && emailAddresses[0].address) || '',
            dateOfBirth: dateOfBirth ? moment(dateOfBirth).format('L') : null,
            addressOne: (addresses.length > 0 && addresses[0].addressOne) || '',
            addressTwo: (addresses.length > 0 && addresses[0].addressTwo) || '',
            city: (addresses.length > 0 && addresses[0].city) || '',
            state: (addresses.length > 0 && addresses[0].state) || '',
            zip: (addresses.length > 0 && addresses[0].zip) || '',
            phone: (phoneNumbers.length > 0 && phoneNumbers[0].phoneNumber) || '',
            cellPhone: (phoneNumbers.length > 1 && phoneNumbers[1].phoneNumber) || '',
            gender,
        };
        Object.assign(this, enrollmentObj);
    }

    @Watch('enrollment.careGiverInformationData', { immediate: true, deep: true })
    watchCareGiver(values: typeof EnrollmentModule.prototype.careGiverInformationData) {
        const { firstName, lastName, emailAddresses, addresses, phoneNumbers } = this.enrollment.patientInformationData;
        const enrollmentObj = {
            caregiverFirstName: firstName,
            caregiverLastName: lastName,
            caregiverEmail: (emailAddresses.length > 0 && emailAddresses[0].address) || '',
            caregiverZip: (addresses.length > 0 && addresses[0].zip) || '',
            caregiverPhone: (phoneNumbers.length > 0 && phoneNumbers[0].phoneNumber) || '',
            cellPhone: (phoneNumbers.length > 1 && phoneNumbers[1].phoneNumber) || '',
        };
        Object.assign(this, enrollmentObj);
    }

    @Watch('enrollment.contactPreferences', { immediate: true, deep: true })
    watchContactPreferences(values: typeof EnrollmentModule.prototype.contactPreferences) {
        type ContactMap = { [key: number]: string };
        interface IContacts {
            contactText: boolean | null;
            contactPhone: boolean | null;
            contactEmail: boolean | null;
        }
        const contactMap: ContactMap = {
            12: 'contactText',
            1: 'contactPhone',
            5: 'contactEmail',
            13: 'contactRegularMail',
        };
        const contactPreferences = values.reduce(
            (acc, pref) => {
                const contactInfoType = contactMap[pref.contactInfoType as keyof ContactMap] as keyof IContacts;
                if (contactInfoType) {
                    acc[contactInfoType as keyof IContacts] = pref.isOptedIn || null;
                }
                return acc;
            },
            { contactText: null, contactEmail: null, contactPhone: null } as IContacts
        );
        Object.assign(this, contactPreferences);
    }

    @Watch('enrollment.isCareGiver', { immediate: true, deep: true })
    watchIsCaregiver(values: typeof EnrollmentModule.prototype.isCareGiver) {
        Object.assign(this, values);
    }

    buildContactPreferences() {
        const prefs = [
            { val: this.contactText, enum: 12 },
            { val: this.contactPhone, enum: 1 },
            { val: this.contactEmail, enum: 5 },
            { val: this.contactRegularMail, enum: 13 },
        ];
        return prefs.reduce((acc: EnterpriseCoordinatorAccountServiceModelsAccountContactPreferenceModel[], pref) => {
            pref.val &&
                acc.push({
                    contactInfoType: pref.enum,
                    isOptedIn: true,
                    isPreferred: false,
                });
            return acc;
        }, []);
    }

    structureInfo(isCareGiver = false) {
        const phone = isCareGiver ? this.caregiverPhone : this.phone;
        const patientInfo = {
            firstName: isCareGiver ? this.caregiverFirstName : this.firstName,
            lastName: isCareGiver ? this.caregiverLastName : this.lastName,
            dateOfBirth: moment(this.dateOfBirth || '', ['MM/DD/YYYY', 'YYYY-MM-DD']),
            addresses: [
                {
                    addressOne: this.addressOne,
                    addressTwo: this.addressTwo,
                    city: this.city,
                    state: this.state,
                    zip: isCareGiver ? this.caregiverZip : this.zip,
                    addressType: 6,
                },
            ],
            emailAddresses: [
                {
                    address: isCareGiver ? this.caregiverEmail : this.email,
                    emailAddressType: 0,
                },
            ],
            phoneNumbers: [
                {
                    phoneType: 1,
                    phoneNumber: phone!.replace(/\D/g, ''),
                    phonePurpose: 1,
                },
            ],
            gender: +this.gender,
        };
        if (this.cellPhone) {
            patientInfo.phoneNumbers.push({
                phoneType: 2,
                phonePurpose: 1,
                phoneNumber: this.cellPhone.replace(/\D/g, ''),
            });
        }
        if (isCareGiver) {
            delete patientInfo.dateOfBirth;
            delete patientInfo.gender;
        }
        return patientInfo;
    }

    touch() {
        this.$v.$touch();
    }

    public async updateInfo() {
        const patientInformation = this.structureInfo();
        let careGiverInformation = {} as typeof EnrollmentModule.prototype.careGiverInformationData;
        const contactPreferences = this.buildContactPreferences();
        if (this.isCareGiver) {
            careGiverInformation = this.structureInfo(true);
        }
        await Promise.all([
            this.enrollment.updatePatientInformation(patientInformation),
            this.enrollment.updateCareGiverInformation(careGiverInformation),
            this.enrollment.updateContactPreferences(contactPreferences),
            this.enrollment.setIsCaregiver(this.isCareGiver),
        ]);
    }

    async submit() {
        this.touch();
        let didSucceed = null;
        if (!this.$v.$anyError) {
            // Only make calls to survey and enrollment if there are no validation errors
            this.isLoading = true;
            this.updateInfo();
            didSucceed = true;
            // block enrollment if the survey wasn't created, and send user to error page
            // const enrollmentResult = (!this.survey.error && (await this.enrollment.submitToAPI())) || null;
            // if (enrollmentResult && enrollmentResult.status === 200) {
            //     const memberNumber =
            //         (enrollmentResult.data &&
            //             enrollmentResult.data.data &&
            //             enrollmentResult.data.data.enrollment &&
            //             enrollmentResult.data.data.enrollment.memberNumbers[0].number) ||
            //         '';
            //     const expirationDate =
            //         (enrollmentResult.data &&
            //             enrollmentResult.data.data &&
            //             enrollmentResult.data.data.enrollment &&
            //             enrollmentResult.data.data.enrollment.endDate) ||
            //         '';
            //     this.enrollment.setExpirationDate(moment(expirationDate));
            //     this.enrollment.setMemberNumber(memberNumber);
            // this.$router.push({ name: 'need-a-card-success' });
            // } else {
            //     this.$router.push({ name: 'error' });
            // }
        }
        return didSucceed;
    }
}
