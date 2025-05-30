import { maxLength, required, numeric, email } from 'vuelidate/lib/validators';
import Vue from 'vue';
import { Moment } from 'moment';
import _ from 'lodash';
import { Validate } from '~/validation/Validate';
import { QueryStringMatch } from '~/node_modules/@trialcard/enums';
import { IHeader, ISearchFields } from '~/types/componentTypes';

export class SearchFields extends Vue implements ISearchFields {
    // @Validate({ required })
    // public firstNameQueryType: QueryStringMatch = 3;

    @Validate({ maxLength: maxLength(50) })
    public firstName = '';

    // @Validate({ required })
    // public lastNameQueryType: QueryStringMatch = 3;

    @Validate({ maxLength: maxLength(50) })
    public lastName = '';

    @Validate({})
    public dateOfBirth: Moment | string | null = null;

    @Validate({ maxLength: maxLength(25) })
    public city = '';

    @Validate({ maxLength: maxLength(25) })
    public state = '';

    @Validate({ numeric })
    public postalCode = '';

    @Validate({ maxLength: maxLength(50) })
    public country = '';

    @Validate({ maxLength: maxLength(50) })
    public memberNumber = '';

    @Validate({ email, maxLength: maxLength(50) })
    public email = '';

    @Validate({ numeric })
    public phone = '';

    @Validate({ maxLength: maxLength(50) })
    public alternateId = '';

    getClassName(index: number): string {
        const groupings = this.getFieldWidths();
        if (index <= groupings.length) {
            return groupings[index];
        }

        return '';
    }

    getFieldWidths(): string[] {
        return ['col-8', 'col-4', 'col-4', 'col-5', 'col-3', 'col-4', 'col-6', 'col-12', 'col-6', 'col-6', 'col-12'];
    }

    getFieldDefaults(): ISearchFields {
        return new SearchFields();
    }

    getHeaderConfig(): IHeader[] {
        return [
            {
                value: 'FirstName',
                text: 'First Name',
            },
            {
                value: 'LastName',
                text: 'Last Name',
            },
            {
                value: 'DateOfBirth',
                text: 'Date Of Birth',
            },
            {
                value: 'Address1',
                text: 'Address',
            },
            {
                value: 'City',
                text: 'City',
            },
            {
                value: 'State',
                text: 'State',
            },
            {
                value: 'ZipCode',
                text: 'Zip Code',
            },
            {
                value: 'PcnNumber',
                text: 'PCN',
            },
            {
                value: 'BinNumber',
                text: 'BIN',
            },
            {
                value: 'GroupNumber',
                text: 'Group Number',
            },
        ];
    }
}
