<template>
    <keep-alive>
        <v-stepper ref="stepper" v-model="currentStep" non-linear class="elevation-0 fill-height" light>
            <v-layout wrap class="pb-12">
                <v-flex xs12 text-center class="pb-12">
                    <v-stepper-header class="elevation-0">
                        <v-divider></v-divider>
                        <v-stepper-step v-for="(step, k, i) of steps" :key="k" v-bind="stepAttrs(k, i)" color="primary">
                            {{ getRef(k) ? getRef(k).title : step.title }}
                        </v-stepper-step>
                        <v-divider></v-divider>
                    </v-stepper-header>
                    <v-stepper-items>
                        <v-stepper-content v-for="(step, k, i) of steps" :key="k" :ref="k" :step="i + 1" class="pa-0">
                            <v-layout wrap>
                                <v-flex xs12 sm12 lg6 offset-lg3>
                                    <component :is="step" :key="k" :ref="k" />
                                </v-flex>
                            </v-layout>
                        </v-stepper-content>
                    </v-stepper-items>
                    <!-- <v-btn color="warning" @click="resetStep">
                        Reset Form
                    </v-btn> -->
                    <v-btn v-if="!isFirstStep" flat @click="prevStep">Back</v-btn>
                    <v-btn
                        v-if="!isLastStep"
                        ref="nextButton"
                        :disabled="(getRef(currentStepName) && getRef(currentStepName).isInvalid) || $wait.is('nuxt-step')"
                        color="primary"
                        class="white--text"
                        @click="nextStep"
                    >
                        Next
                    </v-btn>
                    <v-btn
                        v-if="isLastStep"
                        ref="submitButton"
                        :disabled="(getRef(currentStepName) && getRef(currentStepName).isInvalid) || $wait.is('nuxt-step')"
                        color="primary"
                        class="white--text"
                        @click="nextStep"
                    >
                        Submit
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-stepper>
    </keep-alive>
</template>

<style lang="scss" scoped></style>
<script lang="ts">
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { startCase } from 'lodash';
import Stepper from '~/components/Stepper';
import SurveyModule from '~/store/survey';
import EnrollmentModule from '~/store/enrollment';

@Component<Enrollment>({
    fetch(ctx) {
        // ctx.container.get(SurveyModule).loadLocalFullSurvey(process.env.SURVEY_CARE!);
    },
    created() {},
    middleware: [],
})
export default class Enrollment extends Stepper(
    {
        title: 'Enrollment',
        waiter: 'nuxt-step',
        module: EnrollmentModule,
    },
    {}
) {
    protected async onComplete() {
        const page = await this.module.submitToAPI();
        this.$router.push({ name: 'have-a-card-success' });
    }
    public startCase = startCase;
}
</script>
