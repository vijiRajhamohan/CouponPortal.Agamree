<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="survey.questionText" :validator="validator">
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-bind="{ ...$attrs, ...attrs, ...bindData }"
                    :label="survey.questionText"
                    append-icon="$vuetify.icons.event"
                    v-on="{ ...$listeners, ...events, ...getEvents(on) }"
                    @change="onChange($event)"
                ></v-text-field>
            </template>
            <v-date-picker color="primary" :value="utcValue" @input="menu = false" @change="onChange($event)"></v-date-picker>
        </v-menu>
    </form-field>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Model, Emit } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { intersection } from 'lodash';
import moment, { Moment } from 'moment';
import { Validation } from 'vuelidate';
import { SurveyQuestionModel } from '~/models/survey';
import TcDatePicker from '~/components/TcDatePicker.vue';

@Component<SurveyDate>({
    inheritAttrs: false,
})
export default class SurveyDate extends Vue {
    @Prop({ type: Object, required: true })
    public survey!: SurveyQuestionModel;

    @Prop({ type: Object })
    public validator?: Validation;

    @Model('change', { type: [Object, String] })
    public value!: Moment | string | null;

    public get bindData() {
        return {
            ...(this.$isMobile
                ? { type: 'date', value: this.utcValue }
                : { mask: 'date', 'return-masked-value': true, value: this.strValue }),
        };
    }

    public getEvents(on: any) {
        return this.$isMobile ? {} : on;
    }

    public get strValue() {
        if (!this.value) {
            return null;
        }
        return moment.isMoment(this.value) ? this.value && this.value.format('MM/DD/YYYY') : moment(this.value!).format('MM/DD/YYYY');
    }

    public get utcValue() {
        if (!this.value) {
            return null;
        }
        return moment.isMoment(this.value) ? this.value && this.value.format('YYYY-MM-DD') : moment(this.value!).format('YYYY-MM-DD');
    }

    @Emit('change')
    public onChange(value: string) {
        return moment(value);
    }

    public menu = false;
}
</script>
