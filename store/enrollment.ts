import { Mutation, Action } from 'vuex-module-decorators';
import { Resolve } from 'vue-di';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { EdgePatientEnrollmentApi } from '@trialcard/apigateway.client/edgePatientEnrollmentApi';
import {
    EnrollPatientRequestModel,
    EnterpriseCoordinatorAccountUpsearchRequestModel,
    UpsearchModelEnterpriseCoordinatorPatientServiceModelsPatientUpsearchModel,
    UpsearchModelEnterpriseCoordinatorAccountServiceModelsAccountUpsearchModel,
    EnterpriseCoordinatorPatientServiceModelsPatientUpsearchModel,
    EnterpriseCoordinatorSharedAddressUpsearchModel,
    EnterpriseCoordinatorSharedEmailAddressUpsearchModel,
    EnterpriseCoordinatorSharedPhoneUpsearchModel,
    UpsearchModelEnterpriseCoordinatorPayorServiceModelsPayorUpsearchModel,
    EnterpriseCoordinatorAccountServiceModelsAccountContactPreferenceModel,
    UpsearchModelEnterpriseCoordinatorPrescriberServiceModelsPrescriberUpsearchModel,
    UpsearchModelEnterpriseCoordinatorSiteServiceModelsSiteUpsearchModel,
} from '@trialcard/apigateway.models';
import { Gender, RoleType } from '@trialcard/enums';

import { Moment } from 'moment';
import { AxiosResponse } from 'axios';
import { EdgeEnrollmentApi } from '@trialcard/apigateway.client';
import { Settings } from '~/services/settings';

import SurveyModule from '~/store/survey';

import { rolling365 } from '~/tests/e2e/@data/shared/dates'
import { pharmacyMN } from '~/tests/e2e/@data/shared/memberNumbers'

@InjectModule({ stateFactory: true }, module)
export default class EnrollmentModule extends InjectVuexModule {
    @Resolve
    public patientEnrollmentApi!: EdgePatientEnrollmentApi;

    @Resolve
    public enrollmentApi!: EdgeEnrollmentApi;

    @Resolve
    public settings!: Settings;

    @Resolve
    public survey!: SurveyModule;

    isCareGiver: boolean | null = null;

    defaultPatientInformationData = {
        firstName: '' as string,
        lastName: '' as string,
        dateOfBirth: null as Moment | null,
        addresses: [] as EnterpriseCoordinatorSharedAddressUpsearchModel[],
        emailAddresses: [] as EnterpriseCoordinatorSharedEmailAddressUpsearchModel[],
        phoneNumbers: [] as EnterpriseCoordinatorSharedPhoneUpsearchModel[],
        gender: null as Gender | null,
    };

    defaultCareGiverInformationData = {
        firstName: '' as string,
        lastName: '' as string,
        addresses: [] as EnterpriseCoordinatorSharedAddressUpsearchModel[],
        emailAddresses: [] as EnterpriseCoordinatorSharedEmailAddressUpsearchModel[],
        phoneNumbers: [] as EnterpriseCoordinatorSharedPhoneUpsearchModel[],
    };

    defaultPrescriberData = [
        {
            model: {
                firstName: '',
                lastName: '',
                npi: '',
                accountRelationshipIsPrimary: true,
                prescriberLicenses: [],
                externalIds: [],
                addresses: [],
                phoneNumbers: [],
                emailAddresses: [],
            },
        },
    ] as UpsearchModelEnterpriseCoordinatorPrescriberServiceModelsPrescriberUpsearchModel[];

    defaultSiteData = [
        {
            model: {
                accountRelationshipIsPrimary: true,
                siteRoleType: RoleType.PrescriberSite,
                pointOfContacts: [],
                description: '',
                addresses: [
                    {
                        addressOne: '',
                        addressTwo: '',
                        zip: '',
                        city: '',
                        state: '',
                    },
                ],
                contacts: [],
                emailAddresses: [],
                externalIds: [],
                phoneNumbers: [],
                globalIds: [],
            },
        },
    ] as UpsearchModelEnterpriseCoordinatorSiteServiceModelsSiteUpsearchModel[];

    defaultPayorData = [
        {
            model: {
                payorId: (null as unknown) as number,
                payorType: (null as unknown) as number,
                accountRelationshipIsPrimary: true,
                payorGroup: '',
                payorName: '',
                webAddresses: [],
                addresses: [],
                phoneNumbers: [
                    {
                        phoneType: 1,
                        phoneNumber: '',
                        phonePurpose: 1,
                    },
                    {
                        phoneType: 3,
                        phoneNumber: '',
                        phonePurpose: 8,
                    },
                ],
                emailAddresses: [],
                contacts: [],
                payorBenefit: {
                    dateOfBirth: null as Moment | null,
                    policyHolderFirstName: '',
                    policyHolderLastName: '',
                    relationshipToPatient: undefined,
                    policyNumber: '',
                    planType: undefined,
                },
            },
        },
    ] as UpsearchModelEnterpriseCoordinatorPayorServiceModelsPayorUpsearchModel[];

    defaultContactPreferences = [] as EnterpriseCoordinatorAccountServiceModelsAccountContactPreferenceModel[];

    defaultMemberNumber = pharmacyMN.number

    defaultExpirationDate = rolling365

    memberNumber = this.defaultMemberNumber;
    expirationDate = this.defaultExpirationDate;
    patientInformationData = { ...this.defaultPatientInformationData };
    careGiverInformationData = { ...this.defaultCareGiverInformationData };
    prescriberData = [ ...this.defaultPrescriberData ];
    siteData = [ ...this.defaultSiteData ];
    payorData = [ ...this.defaultPayorData ];
    contactPreferences = [...this.defaultContactPreferences];

    @Mutation
    public async updatePatientInformation(newPatientInformation: typeof EnrollmentModule.prototype.patientInformationData) {
        this.patientInformationData = { ...this.patientInformationData, ...newPatientInformation };
    }

    @Mutation
    public async updatePrescribers(newPrescriberData: UpsearchModelEnterpriseCoordinatorPrescriberServiceModelsPrescriberUpsearchModel[]) {
        this.prescriberData = [...newPrescriberData];
    }

    @Mutation
    public async updateSites(newSites: UpsearchModelEnterpriseCoordinatorSiteServiceModelsSiteUpsearchModel[]) {
        this.siteData = [...newSites];
    }

    @Mutation
    public async updatePayors(newPayorData: UpsearchModelEnterpriseCoordinatorPayorServiceModelsPayorUpsearchModel[]) {
        this.payorData = [...newPayorData];
    }

    @Mutation
    public async updateCareGiverInformation(newCareGiverInformation: typeof EnrollmentModule.prototype.careGiverInformationData) {
        this.patientInformationData = { ...this.patientInformationData, ...newCareGiverInformation };
    }

    @Mutation
    public async updateContactPreferences(newContactPreferences: EnterpriseCoordinatorAccountServiceModelsAccountContactPreferenceModel[]) {
        this.contactPreferences = [...newContactPreferences];
    }

    @Mutation
    public setMemberNumber(memberNumber: string) {
        this.memberNumber = memberNumber;
    }

    @Mutation
    public setExpirationDate(expirationDate: Moment) {
        this.expirationDate = expirationDate;
    }

    @Mutation
    public setIsCaregiver(isCareGiver: boolean | null) {
        this.isCareGiver = isCareGiver;
    }

    @Action({ rawError: true })
    public clearStore() {
        this.setMemberNumber(this.defaultMemberNumber);
        this.setExpirationDate(this.defaultExpirationDate);
        this.updatePatientInformation(this.defaultPatientInformationData);
        this.updateCareGiverInformation(this.defaultCareGiverInformationData);
        this.updatePrescribers(this.defaultPrescriberData);
        this.updateSites(this.defaultSiteData);
        this.updatePayors(this.defaultPayorData);
        this.updateContactPreferences(this.defaultContactPreferences);
    }

    @Action({ rawError: true })
    public clearEnrollment() {
        this.updatePatientInformation({ ...this.defaultPatientInformationData });
        this.setMemberNumber(this.defaultMemberNumber);
    }

    @Action({ rawError: true })
    public async submitToAPI() {
        let response = null;
        const { prescriberData, siteData, payorData, contactPreferences } = this;
        try {
            const patient = {
                account: {
                    patientData: {
                        canUpdate: true,
                        canInsert: true,
                        skipSearch: false,
                        model: {
                            ...this.patientInformationData,
                            middleName: '',
                            suffix: '',
                            nickname: '',
                        } as EnterpriseCoordinatorPatientServiceModelsPatientUpsearchModel,
                    } as UpsearchModelEnterpriseCoordinatorPatientServiceModelsPatientUpsearchModel,
                    accountData: {
                        canUpdate: true,
                        canInsert: true,
                        skipSearch: false,
                        model: {
                            accountType: 1,
                            accountStatus: 1,
                            contactPreferences,
                        },
                    } as UpsearchModelEnterpriseCoordinatorAccountServiceModelsAccountUpsearchModel,
                    prescriberData,
                    siteData,
                    payorData,
                    surveySessionData: [this.survey.sessionId] as number[],
                } as EnterpriseCoordinatorAccountUpsearchRequestModel,
            } as EnrollPatientRequestModel;
            response = await this.patientEnrollmentApi.patientEnrollmentEnrollPatient(patient, this.settings.programId);
        } catch {
            response = { status: 400 } as AxiosResponse;
        }
        return response;
    }
}
