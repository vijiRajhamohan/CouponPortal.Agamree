<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="$attrs.label" :validator="validator">
        <v-radio-group
            v-bind="{ ...$attrs, ...attrs }"
            :value="value"
            v-on="{ ...$listeners, ...events }"
            @change="$emit('change', $event)"
        >
            <v-checkbox v-for="answer in survey.answers" :key="answer.answersId" :label="answer.answerValue" />
        </v-radio-group>
    </form-field>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { intersection } from 'lodash';
import { Validation } from 'vuelidate';
import { SurveyQuestionModel } from '~/models/survey';

@Component<SurveyMultipleChoiceMultiAnswer>({
    inheritAttrs: false,
})
export default class SurveyMultipleChoiceMultiAnswer extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Prop({ type: Object })
    public validator?: Validation;

    @Model('change', { required: true })
    public value!: string[];
}
</script>
