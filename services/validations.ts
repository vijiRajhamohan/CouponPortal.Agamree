import { helpers, maxLength, minLength, and, decimal } from 'vuelidate/lib/validators';
import moment from 'moment';

export const phone = helpers.regex(
    'phone',
    /^[\\(]{0,1}([2-9]){1}\d{2}[\\)]{0,1}[ ]?([^0-1]){1}(\d){2}[ ]?[-]?[ ]?(\d){4}[ ]*((x){0,1}(\d){1,5}){0,1}$/
);
export const zip = helpers.regex('zip', /^\d{5}(?:[-\s]\d{4})?$/);
export const ssn4 = and(maxLength(4), minLength(4));
export const date = (value: string | Date) => moment(value, ['MM/DD/YYYY', 'YYYY-MM-DD'], true).isValid();
export const notInFuture = (value: string | Date): boolean => {
    return moment(value, ['MM/DD/YYYY', 'YYYY-MM-DD']).isSameOrBefore();
};
export const atLeast18YearsAgo = (date: string | Date): boolean =>
    moment(date, ['MM/DD/YYYY', 'YYYY-MM-DD']).isBefore(moment().subtract(18, 'years'));
export const notAVampire = (date: string | Date): boolean =>
    moment(date, ['MM/DD/YYYY', 'YYYY-MM-DD']).isAfter(moment('1880-01-01', 'YYYY-MM-DD'));
export const isChecked = helpers.req(true);
export const color = helpers.regex(
    'color',
    // from https://gist.github.com/olmokramer/82ccce673f86db7cda5e
    // eslint-disable-next-line no-useless-escape
    /(^[a-zA-Z]+$)|(#(?:[0-9a-f]{2}){2,4}|#[0-9a-f]{3}|(?:rgb?|hsl?)\((?:\d+%?(?:deg|rad|grad|turn)?(?:,|\s)+){2,3}[\s\/]*[\d\.]+%?\))/i
);
export const currency = decimal;
