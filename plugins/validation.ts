import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor from 'vuelidate-error-extractor';
import VueTheMask from '@rj-pkgs/vue-the-mask';
import { FormField, FormContext, FormSummary } from '~/components/FormField';
Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.use(VuelidateErrorExtractor, {
    i18n: false,
    messages: {
        required: '{attribute} is required',
        maxLength: '{attribute} cannot be longer than {max} characters',
        minLength: '{attribute} cannot be shorter than {min} characters',
        upperCase: '{attribute} must contain an uppercase letter',
        lowerCase: '{attribute} must contain a lowercase letter',
        between: '{attribute} must be between {min} and {max}',
        minValue: '{attribute} must be at least {min}',
        maxValue: '{attribute} must be no more than {max}',
        hasNumbers: '{attribute} must contain a number',
        hasAlpha: '{attribute} must contain a letter',
        alpha: '{attribute} must be only letters',
        alphaNum: '{attribute} must be only letters and numbers',
        numeric: '{attribute} must be only numbers',
        integer: '{attribute} must be an integer',
        decimal: '{attribute} must be a decimal',
        email: '{attribute} is not a valid email address',
        ipAddress: '{attribute} is not a valid ip address',
        macAddress: '{attribute} is not a valid mac address',
        url: '{attribute} is not a valid url',
        phone: '{attribute} must be a 10 digit phone number',
        special: '{attribute} must contain a special character',
        sameAs: '{attribute} must be the same as {eq}',
        zip: '{attribute} is invalid',
        date: '{attribute} is invalid',
        notInFuture: '{attribute} must not be a future date.',
        atLeast18YearsAgo: '{attribute} must be at least 18 years ago.',
        notAVampire: '{attribute} must within the last 150 years.',
        color: 'Must be a valid CSS color value',
        currency: '{attribute} must be a dollar amount',
    },
    validationKeys: {},
});
Vue.component('FormField', FormField);
Vue.component('FormContext', FormContext);
Vue.component('FormSummary', FormSummary);
