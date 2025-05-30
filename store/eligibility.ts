import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Resolve } from 'vue-di';
import { SurveySessionValueModel } from '@trialcard/apigateway.models';
import SessionModule from './session';
import { Settings } from '~/services/settings';

export interface IEligibilityQuestions {
    surveySessionId: string;
    questionId: number;
    answerId: number;
}
@InjectModule({ stateFactory: true }, module)
export default class EligibilityModule extends InjectVuexModule {
    @Resolve
    public settings!: Settings;

    @Resolve
    public session!: SessionModule;

    public eligibilityData = [] as SurveySessionValueModel[];

    public isEligible = false;

    @Mutation
    public async updateEligibilityData(newEligibilityData: typeof EligibilityModule.prototype.eligibilityData) {
        this.eligibilityData = newEligibilityData;
    }

    @Mutation
    public async updateIsEligible(isEligible: boolean) {
        this.isEligible = isEligible;
    }

    @Action({ rawError: true })
    public async clearStore() {
        this.updateEligibilityData([]);
        this.updateIsEligible(false);
    }


    @Action({ rawError: true })
    public checkEligibility(eligibilityData: SurveySessionValueModel[]): boolean {
        const correctAnswers = [
            +this.settings.eligibilityFederalAnswer,
            +this.settings.eligibilityCitizenAnswer,
            +this.settings.eligibilityAgeAnswer,
        ] as number[];

        const isEligible = eligibilityData.every(question => question.answerId && correctAnswers.includes(question.answerId));
        this.updateIsEligible(isEligible);
        return isEligible;
    }
}
