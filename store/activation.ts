import { Action, Mutation } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Resolve } from 'vue-di';
import { ClaimV1Api, EdgeEnrollmentApi } from '@trialcard/apigateway.client';
import {
    EnrollmentIsValidMemberNumberRequestModel,
    EnrollmentCheckMemberNumberDefaultResponse,
    ClaimAccumulatorModels,
} from '@trialcard/apigateway.models';
import { AxiosResponse } from 'axios';
import { Settings } from '~/services/settings';

import { EdgeCardApi } from '@trialcard/apigateway.client/edgeCardApi';
import {
    ICreateCardRequestModel,
} from '@trialcard/apigateway.models';

import { pharmacyMN } from '~/tests/e2e/@data/shared/memberNumbers';

@InjectModule({ stateFactory: true }, module)
export default class ActivationModule extends InjectVuexModule {
    @Resolve
    public claimApi!: ClaimV1Api;

    @Resolve
    public edgeEnrollmentApi!: EdgeEnrollmentApi;

    @Resolve
    public settings!: Settings;

    
    @Resolve
    public edgeCardApi!: EdgeCardApi;

    public memberNumber = '';

    @Mutation
    updateMemberNumber(newMemberNumber: string) {
        this.memberNumber = newMemberNumber;
    }

    @Action({})
    checkAccumulator(memberNumber: string): Promise<AxiosResponse<ClaimAccumulatorModels>> {
        return this.claimApi.getByMemberNumber(memberNumber, undefined);
    }
    @Action({ rawError: true })
    public async submitToAPI( programNumber: any) {
        let response = null;
        try {
            const data = {
                programId: programNumber,
            } as unknown as ICreateCardRequestModel;
            response = await this.edgeCardApi.cardV1CreateCard(data);
        } catch {
            response = { status: 400 } as AxiosResponse;
        }
        return response;
    }

    @Action({})
    checkMemberNumber(memberNumber: string): Promise<AxiosResponse<EnrollmentCheckMemberNumberDefaultResponse>> {
        const requestModel: EnrollmentIsValidMemberNumberRequestModel = {
            memberNumber,
            haveACard: true,
            partyId: 1, // TODO: ask about this
            checkForEnrollment: true,
        };
        return this.edgeEnrollmentApi.enrollmentCheckMemberNumber(requestModel, this.settings.programId);
    }
}
