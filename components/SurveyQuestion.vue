<template>
    <component
        :is="surveyComponent"
        :ref="name"
        v-bind="$attrs"
        :survey="survey"
        :name="name"
        :validator="preferredValidator || $attrs.validator"
        :value="value"
        v-on="$listeners"
        @change="$emit('change', $event)"
    />
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model, Inject } from 'vue-property-decorator';
import { Validation } from 'vuelidate';
import { get } from 'lodash';
import SurveyDate from '~/components/survey/SurveyDate.vue';
import SurveyFreeForm from '~/components/survey/SurveyFreeForm.vue';
import SurveyMultipleChoice from '~/components/survey/SurveyMultipleChoice.vue';
import SurveyMultipleChoiceMultiAnswer from '~/components/survey/SurveyMultipleChoiceMultiAnswer.vue';
import SurveyMultipleChoiceCombobox from '~/components/survey/SurveyMultipleChoiceCombobox.vue';
import { SurveyQuestionModel, QuestionType } from '~/models/survey';

@Component({
    inheritAttrs: false,
})
export default class SurveyQuestion extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Model('change', { type: [String, Object, Number], required: false })
    public value!: any;

    @Prop({ type: Boolean })
    public combobox!: boolean;

    @Prop({ type: String, required: true })
    public name!: string;

    @Prop({ type: Object, required: false })
    public validator!: Validation;

    @Inject({
        from: 'formValidator',
        default: false,
    })
    public formValidator?: Validation;

    public get preferredValidator() {
        return get(this.formValidator, this.name, this.validator);
    }

    public get surveyComponent() {
        if (this.combobox) {
            return SurveyMultipleChoiceCombobox;
        }
        switch (this.survey && this.survey.questionTypeId) {
            case QuestionType.Date:
                return SurveyDate;
            case QuestionType.FreeForm:
                return SurveyFreeForm;
            case QuestionType.MultipleChoice:
                return SurveyMultipleChoice;
            case QuestionType.MultipleChoiceMultiAnswer:
                return SurveyMultipleChoiceMultiAnswer;
        }
        return undefined;
    }
}
</script>
