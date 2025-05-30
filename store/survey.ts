import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { SurveyV3Api } from '@trialcard/apigateway.client';
import { toNumber, upperCase } from 'lodash';
import { Container, Resolve } from 'vue-di';
import { SurveySessionValueModel } from '@trialcard/apigateway.models';
import { FullSurveyModel } from '~/models/survey';
import { Settings } from '~/services/settings';
import EligibilityModule from '~/store/eligibility';

@InjectModule({ stateFactory: true }, module)
export default class SurveyModule extends InjectVuexModule {
    @Resolve
    public settings!: Settings;

    @Resolve
    public eligibility!: EligibilityModule;

    @Resolve
    public surveyAPI!: SurveyV3Api;

    public surveys: { [key: string]: FullSurveyModel } = {};

    public sessionId = 0;

    public surveyId = '';

    public cardTypeQuestionId = '';

    public cardTypeAnswerId = '';

    public error = false;

    @Action({})
    public loadLocalFullSurvey(surveyId: string) {
        if (this.surveys[surveyId]) return;
        const surveyFiles = require.context('~/assets/surveys/', true, /(\.json)/);
        const surveyData = surveyFiles.keys().map(z => ({ survey: surveyFiles(z) as FullSurveyModel }));
        for (const { survey } of surveyData) {
            this.storeSurvey(survey);
        }
    }

    @Action({ rawError: true })
    public async fetchSurveySession(eligibilityData: SurveySessionValueModel[]) {
        const { surveyId, cardTypeQuestionId, cardTypeAnswerId } = this;
        try {
            const surveySessionResponse = await this.surveyAPI.surveySessionCreate0({ surveyId: Number(surveyId) });
            const surveySessionId =
                (surveySessionResponse &&
                    surveySessionResponse.data &&
                    surveySessionResponse.data.data &&
                    surveySessionResponse.data.data.surveySessionId) ||
                null;
            if (surveySessionId) {
                this.updateSurveySessionId(surveySessionId);
                const questionArr = [...eligibilityData];
                // Add cardType question to eligibilityData
                questionArr.push({
                    questionId: Number(cardTypeQuestionId),
                    answerId: Number(cardTypeAnswerId),
                } as SurveySessionValueModel);

                // map over eligibilityData and add surveySessionId to all questions
                const sessionValues = questionArr.map(question => ({ ...question, surveySessionId }));
                await this.surveyAPI.fullSurveySessionCreate0({ sessionValues });
            } else {
                throw new Error('Invalid survey session ID');
            }

            this.updateSurveySessionId(Number(surveySessionId));
        } catch (error) {
            this.setError(true);
        }
    }

    public getSurveyQuestion(id: string, questionId: string) {
        return this.surveys[id].questionsWithAnswers.find(z => z.questionId === toNumber(questionId)!);
    }

    public getSurveyAnswerByCategoryCode(id: string, questionId: string, answerCategoryCode: string) {
        const question = this.getSurveyQuestion(id, questionId);
        if (question && question.answers) {
            const answer = question.answers.find(answer => upperCase(answer.answerCategoryCode) === upperCase(answerCategoryCode));
            return answer;
        }
        return undefined;
    }

    @Mutation
    public storeSurvey(model: FullSurveyModel) {
        this.surveys[model.surveyId] = model;
    }

    @Mutation
    public updateSurveySessionId(newId: number) {
        this.sessionId = newId;
    }

    @Mutation
    public setError(error: boolean) {
        this.error = error;
    }

    @Mutation
    public setSurveyId(id = this.settings.surveyId) {
        this.surveyId = id;
    }

    @Mutation
    public setCardTypeQuestionId(questionId: string) {
        this.cardTypeQuestionId = questionId;
    }

    @Mutation
    public setCardTypeAnswerId(answerId: string) {
        this.cardTypeAnswerId = answerId;
    }
}
