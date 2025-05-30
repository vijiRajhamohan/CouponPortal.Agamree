<template>
    <div>
        <h2 class="px-0 mb-0 mt-4 brand-header sub-header">Eligibility Questionnaire</h2>
        <v-card-text class="px-0">
            <p aria-hidden="true" class="legend">
                <v-icon>$asterisk</v-icon>
                = Required
            </p>
        </v-card-text>
        <v-row>
            <form-context :validator="$v" :messages="formMessages">
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" class="radio-column">
                            <v-icon
                                aria-required="true"
                                aria-hidden="false"
                                :class="{
                                    'required-icon': true,
                                    'error--text': $v.eligibilityFederal.$error,
                                }"
                            >
                                $asterisk
                            </v-icon>
                            <p
                                :class="{
                                    'question-label': true,
                                    'error--text': $v.eligibilityFederal.$error,
                                }"
                            >
                                {{ $settings.eligibility_question_1 }}
                            </p>
                            <form-field v-slot="{ attrs, events }" name="eligibilityFederal">
                                <v-radio-group ref="eligibility_1_question" v-model="eligibilityFederal" box v-bind="attrs" v-on="events">
                                    <v-radio ref="eligibility_1_answerYes" color="primary" label="Yes" value=""></v-radio>
                                    <v-radio
                                        ref="eligibility_1_answerNo"
                                        color="primary"
                                        label="No"
                                        :value="$settings.eligibilityFederalAnswer"
                                    ></v-radio>
                                </v-radio-group>
                            </form-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="radio-column">
                            <v-icon
                                aria-required="true"
                                aria-hidden="false"
                                :class="{
                                    'required-icon': true,
                                    'error--text': $v.eligibilityCitizen.$error,
                                }"
                            >
                                $asterisk
                            </v-icon>
                            <p
                                :class="{
                                    'question-label': true,
                                    'error--text': $v.eligibilityCitizen.$error,
                                }"
                            >
                                {{ $settings.eligibility_question_2 }}
                            </p>
                            <form-field v-slot="{ attrs, events }" name="eligibilityCitizen">
                                <v-radio-group ref="eligibility_2_question" v-model="eligibilityCitizen" box v-bind="attrs" v-on="events">
                                    <v-radio
                                        ref="eligibility_2_answerYes"
                                        color="primary"
                                        label="Yes"
                                        :value="$settings.eligibilityCitizenAnswer"
                                    ></v-radio>
                                    <v-radio ref="eligibility_2_answerNo" color="primary" label="No" :value="''"></v-radio>
                                </v-radio-group>
                            </form-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="radio-column">
                            <v-icon
                                aria-required="true"
                                aria-hidden="false"
                                :class="{
                                    'required-icon': true,
                                    'error--text': $v.eligibilityAge.$error,
                                }"
                            >
                                $asterisk
                            </v-icon>
                            <p
                                :class="{
                                    'question-label': true,
                                    'error--text': $v.eligibilityAge.$error,
                                }"
                            >
                                {{ $settings.eligibility_question_3 }}
                            </p>
                            <form-field v-slot="{ attrs, events }" name="eligibilityAge">
                                <v-radio-group ref="eligibility_3_question" v-model="eligibilityAge" box v-bind="attrs" v-on="events">
                                    <v-radio
                                        ref="eligibility_3_answerYes"
                                        color="primary"
                                        label="Yes"
                                        :value="$settings.eligibilityAgeAnswer"
                                    ></v-radio>
                                    <v-radio ref="eligibility_3_answerNo" color="primary" label="No" :value="''"></v-radio>
                                </v-radio-group>
                            </form-field>
                        </v-col>
                    </v-row>
                </v-col>
            </form-context>
        </v-row>
        <NextBack :back-function="handleBack" :next-function="submit" />
    </div>
</template>

<style lang="scss" scoped>
.eligibility-btn {
    height: 150px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { required } from 'vuelidate/lib/validators';
import { Watch } from 'vue-property-decorator';
import { CommonTools } from '../tools/commonTools';
import { Validate } from '~/validation/Validate';
import EligibilityModule from '~/store/eligibility';
import surveyData from '~/settings/survey.json';
import NextBack from '~/components/NextBack.vue';
import { Settings } from '~/services/settings';
import LayoutModule from '~/store/layout';
import SurveyModule from '~/store/survey';

@Component<EligibilityComponent>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
    components: {
        NextBack,
    },
})
export default class EligibilityComponent extends Vue {
    @Resolve
    public eligibility!: EligibilityModule;

    @Resolve
    public settings!: Settings;

    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public survey!: SurveyModule;

    public doValidate() {
        this.$v.$touch();

        if (this.$v.$invalid) {
            return false;
        }

        return true;
    }

    public get isInvalid() {
        return this.$v.$invalid && this.$v.$dirty;
    }

    @Watch('eligibility.eligibilityData', { immediate: true, deep: true })
    watchEligibility(values: typeof EligibilityModule.prototype.eligibilityData) {
        const eligibilityValues = {
            eligibilityFederal: values.length > 0 && values[0].answerId &&values[0].answerId.toString() || '',
            eligibilityCitizen: values.length > 1 && values[1].answerId &&values[1].answerId.toString() || '',
            eligibilityAge: values.length > 2 && values[2].answerId &&values[2].answerId.toString() || '',
        }
        Object.assign(this, eligibilityValues);

    }

    public doReset() {
        this.$v.$reset();
    }

    public handleBack() {
        this.updateInfo();
        const name = CommonTools.getRouteName('eligibility', this.layout.configuration.pages, true);
        this.$router.push({ name });
    }

    public updateInfo() {
        this.survey.setSurveyId(this.settings.surveyId);
        this.survey.setCardTypeQuestionId(this.settings.cardTypeQuestionId);
        this.survey.setCardTypeAnswerId(this.settings.cardTypeAnswerId);
        const eligibilityData = [
            { questionId: Number(this.settings.eligibilityFederalQuestion), answerId: Number(this.eligibilityFederal) },
            { questionId: Number(this.settings.eligibilityCitizenQuestion), answerId: Number(this.eligibilityCitizen) },
            { questionId: Number(this.settings.eligibilityAgeQuestion), answerId: Number(this.eligibilityAge) },
        ];
        this.eligibility.updateEligibilityData(eligibilityData);

    }

    public async submit() {
        if (!this.doValidate()) {
            return;
        }
        this.updateInfo();
        const isEligible = await this.eligibility.checkEligibility(this.eligibility.eligibilityData);
        if (isEligible) {
            const name = CommonTools.getRouteName('eligibility', this.layout.configuration.pages);
            this.$router.push({ name });
        } else {
            this.$router.push({ name: 'rejection' });
        }
    }

    @Validate({ required })
    public eligibilityFederal = '';
    @Validate({ required })
    public eligibilityCitizen = '';
    @Validate({ required })
    public eligibilityAge = '';

    public formMessages = {
        required: 'Required',
    };
}
</script>
