<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="$attrs.label" :validator="validator">
        <v-text-field
            v-bind="{ ...$attrs, ...attrs }"
            :value="value"
            :label="survey.questionText"
            v-on="{ ...$listeners, ...events }"
            @change="$emit('change', $event)"
        />
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

@Component<SurveyFreeForm>({
    inheritAttrs: false,
})
export default class SurveyFreeForm extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Prop({ type: Object })
    public validator?: Validation;

    @Model('change', { required: true })
    public value!: string;
}
</script>
