import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Location } from 'vue-router';
import { Moment } from 'moment';
import { EdgePatientEnrollmentApi } from '@trialcard/apigateway.client';
import { Gender } from '@trialcard/enums';
import { Resolve } from 'vue-di';
import { OnClear } from '~/services/clearModule';
import { clearRecords } from '~/services/clearRecords';

@InjectModule({ stateFactory: true }, module)
@OnClear<EnrollmentModule>(async value => value.clear())
export default class EnrollmentModule extends InjectVuexModule {
    @Resolve
    public patientEnrollmentApi!: EdgePatientEnrollmentApi;

    public haveACard = {
        memberNumber: '',
    };

    @Mutation
    public clear() {
        clearRecords(this.haveACard);
    }

    @Mutation
    public updateHaveACard(data: typeof EnrollmentModule.prototype.haveACard) {
        Object.assign(this.haveACard, data);
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
    //                 model: {
    //                     addresses: [
    //                         {
    //                             addressOne: this.haveACard.memberNumber,
    //                             addressTwo: this.haveACard.memberNumber,
    //                         },
    //                     ],
    //                 },
    //             },
    //         },
    //     });
    //     return {}; // dest route
    // }
}
