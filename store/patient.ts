import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Location } from 'vue-router';
import { Moment } from 'moment';
import { EdgePatientEnrollmentApi } from '@trialcard/apigateway.client';
import { Gender } from '@trialcard/enums';
import { Resolve } from 'vue-di';
import { EnrollmentExtV3Api } from '@trialcard/enrollment-ext-v3.client';
import {
    EnrollmentPatientSearchRequestModel,
    EnrollmentPatientSearchResultModelResponse,
    EnrollmentPatientSearchRecordModel,
} from '@trialcard/enrollment-ext-v3.models';
import { OnClear } from '~/services/clearModule';
import { clearRecords } from '~/services/clearRecords';

@InjectModule({ stateFactory: true }, module)
@OnClear<PatientModule>(async value => value.clear())
export default class PatientModule extends InjectVuexModule {
    @Resolve
    public patientEnrollmentApi!: EdgePatientEnrollmentApi;
    @Resolve
    public enrollmentExtApi!: EnrollmentExtV3Api;

    private searchResults: EnrollmentPatientSearchRecordModel[] = [];

    @Action({})
    public async patientSearch(programId: number, request: EnrollmentPatientSearchRequestModel) {
        let response: EnrollmentPatientSearchResultModelResponse;
        try {
            const patientSearchResponse = await this.enrollmentExtApi.patientSearch.post(programId, request);
            const patientSearchData = patientSearchResponse.data;
            this.searchResults = patientSearchData.data.results;
        } catch (error) {
            // log error
        }
        return response!;
    }

    public patientInformation = {
        firstName: '',
        lastName: '',
        dateOfBirth: null as Moment | string | null,
        gender: null as Gender | null,
        addresses: [
            {
                addressOne: '',
                addressTwo: '',
                zip: '',
                city: '',
                state: '',
            },
        ],
        phoneNumbers: [
            {
                phoneNumber: '',
            },
        ],
        emailAddresses: [
            {
                address: '',
            },
        ],
    };

    @Mutation
    public clear() {
        clearRecords(this.patientInformation);
    }

    @Mutation
    public updatePatientInformation(data: typeof PatientModule.prototype.patientInformation) {
        Object.assign(this.patientInformation, data);
    }
    /*

    @Action({})
    public async submit() {
        try {
            await this.uploadDocument();
            const site = await this.createSite();
            const prescriber = await this.createPrescriber();
            await this.enrollPatient(site, prescriber);
        } catch {
            //error page
            return;
        }
        this.clear();
        return;
    }
    */

    // @Action({})
    // public async submit(): Promise<object | string> {
    //     const response = await this.patientEnrollmentApi.patientEnrollmentEnrollPatient({
    //         account: {
    //             accountData: {
    //                 canInsert: true,
    //                 canUpdate: true,
    //                 skipSearch: false,
    //                 model: {},
    //             },
    //         },
    //     });
    //     return {}; // dest route
    // }
}
