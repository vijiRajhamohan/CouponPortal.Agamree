<template>
    <form-field v-slot="{ attrs, events }" :name="$attrs.name" :label="$attrs.label" :validator="validator">
        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-mask="!$isMobile ?'##/##/####' : ''"
                    v-bind="{ ...$attrs, ...attrs, ...bindData }"
                    :value="!$isMobile ?  strValue : utcValue"
                    append-icon="$vuetify.icons.event"
                    autocomplete="disabled"
                    v-on="{ ...$listeners, ...events, ...getEvents(on) }"
                    @change="onChange($event)"
                ></v-text-field>
            </template>
            <v-date-picker :value="utcValue" :max="maxDate" :min="minDate" @input="menu = false" @change="onChange($event)"></v-date-picker>
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
import { notInFuture, notAVampire } from '~/services/validations';

@Component<TcDatePicker>({
    inheritAttrs: false,
})
export default class TcDatePicker extends Vue {
    @Prop({ type: Object, required: true })
    validator!: Validation;

    @Model('change', { type: [Object, Date, String] })
    value!: Moment | string | null;

    notInFuture = notInFuture;
    menu = false;

    get bindData() {
        return {
            ...(this.$isMobile
                ? { type: 'date', value: this.utcValue }
                : { mask: 'date', 'return-masked-value': true, value: this.strValue }),
        };
    }

    getEvents(on: any) {
        return this.$isMobile ? {} : on;
    }

    get strValue() {
        if (this.value && typeof this.value === 'string' && this.isValidDate(this.value)) {
            return moment.isMoment(this.value)
                ? this.value.format('MM/DD/YYYY')
                : moment(this.value, ['MM/DD/YYYY', 'YYYY-MM-DD']).format('MM/DD/YYYY');
        }
        return null;
    }

    get utcValue() {
        if (this.value && typeof this.value === 'string' && this.isValidDate(this.value)) {
            return moment.isMoment(this.value)
                ? this.value.format('YYYY-MM-DD')
                : moment(this.value, ['MM/DD/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
        }
        return null;
    }

    @Emit('change')
    onChange(value: string) {
        const x = moment(value, ['MM/DD/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD');
        return x;
    }

    get maxDate(): string {
        return new Date().toISOString().split('T')[0];
    }

    get minDate(): string {
        return new Date(this.$settings.minDate).toISOString().split('T')[0];
    }

    isValidDate(value: string): boolean {
        return this.isValidDateFormat(value) && this.isDateInRange(value);
    }

    isValidDateFormat(value: string): boolean {
        const regYearFirst = /^(\d{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12]\d|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1\d|2[0-8]))|(\d{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0\d|1[0-6])00)[-/]?02[-/]?29)$/g;
        const regMonthFirst = /^(((0[13-9]|1[012])[-/]?(0[1-9]|[12]\d|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1\d|2[0-8]))[-/]?\d{4}|02[-/]?29[-/]?(\d{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0\d|1[0-6])00))$/g;

        return regYearFirst.test(value) || regMonthFirst.test(value);
    }

    isDateInRange(value: string): boolean {
        return notAVampire(value) && notInFuture(value);
    }

    invalidDateValue() {
        this.$emit('invalidDateValue');
    }
}
</script>
