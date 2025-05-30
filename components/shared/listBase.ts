import Vue from 'vue';
import _ from 'lodash';
import { Validation } from 'vuelidate';
import { CommonTools } from '../tools/commonTools';
import { IStepperStep } from '../StepperStep';
import { Validate } from '~/validation/Validate';
import { ISearchFields } from '~/types/componentTypes';

export class ListBase extends Vue {
    // Only define functions, looping thru attributes
    fieldKeys(searchFields: ISearchFields) {
        const searchKeys = Object.getOwnPropertyNames(searchFields.getFieldDefaults());
        const parentKeys = Object.getOwnPropertyNames(new Vue());
        const returnKeys = _.difference(searchKeys, parentKeys);

        return returnKeys;
    }

    getTitleDisplayName(str: string) {
        return CommonTools.titleFormat(str) || '';
    }
}
