<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="$attrs.label" :validator="validator">
        <v-checkbox v-bind="{ ...$attrs, ...attrs }" v-on="{ ...$listeners, ...events }" @change="$emit('change', $event)">
            <template slot="label">
                <div v-html="yesAnswer.answerValue" />
            </template>
        </v-checkbox>
    </form-field>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model, Inject } from 'vue-property-decorator';
import { Validation } from 'vuelidate';
import { get } from 'lodash';
import { SurveyQuestionModel } from '~/models/survey';

@Component<SurveyAttestation>({
    inheritAttrs: false,
})
export default class SurveyAttestation extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Prop({ type: Object })
    public validator?: Validation;

    public get yesAnswer() {
        return this.survey.answers.find(x => x.answerCategoryCode.toUpperCase() === 'YES')!;
    }
    public get noAnswer() {
        return this.survey.answers.find(x => x.answerCategoryCode.toUpperCase() === 'NO')!;
    }

    @Model('change', { required: true })
    public value!: string;
}
</script>
