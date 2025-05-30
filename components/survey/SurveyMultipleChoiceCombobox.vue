<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="survey.questionText" :validator="validator">
        <v-combobox
            v-bind="{ ...$attrs, ...attrs }"
            :items="survey.answers"
            item-text="answerValue"
            v-on="{ ...$listeners, ...events }"
            @change="$emit('change', $event)"
        ></v-combobox>
    </form-field>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model } from 'vue-property-decorator';
import { Validation } from 'vuelidate';
import { SurveyQuestionModel } from '~/models/survey';

@Component<SurveyMultipleChoiceCombobox>({
    inheritAttrs: false,
})
export default class SurveyMultipleChoiceCombobox extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Prop({ type: Object })
    public validator?: Validation;

    @Model('change', { type: [String, Array, Number, Object], required: true })
    public value!: string[];
}
</script>
