/* eslint-disable no-console */
import { pickBy } from 'lodash';

// import test types
import { IForm } from '../@types/forms';
import { IFormField, FormFields } from '../@types/forms/form-fields/formFields';
import { FormConditions } from '../@types/forms/formConditions';

// import test utils
import { filterConditionalFields } from './fillForm';
import { IncrementalScreenshotTaker } from './takeBrowserScreenshot';

export default async function checkRequiredFields(
    t: TestController,
    form: IForm,
    taker?: IncrementalScreenshotTaker,
    conditions?: FormConditions,
    errorMessages?: { [key: string]: string }
) {
    console.log('Check Required Fields');
    const { textInputs, radioQuestions, checkboxQuestions } = form;
    // combine fields into single object
    let reqFields: FormFields = {
        ...textInputs,
        ...radioQuestions,
        ...checkboxQuestions,
    };
    // filter required fields: required by default, or conditionally required
    reqFields = pickBy(reqFields, field => {
        let isConditionallyRequired = false;
        if (field.isRequiredConditions) {
            isConditionallyRequired = Object.entries(field.isRequiredConditions).some(([key, value]) => {
                const isMatch = conditions && (conditions as any)[key] === value;
                return isMatch;
            });
        }
        return field.required || isConditionallyRequired;
    });

    // exlude fields that are conditionally not visible or filled
    reqFields = filterConditionalFields(reqFields, conditions);

    // test required messages for each required field
    for (const [fieldName, field] of Object.entries(reqFields)) {
        const successMsg = `${fieldName}: passed`;
        // check if filled - for required fields that are also conditions
        const checked = field.selector.find('input:checked');
        if (await checked.count) {
            console.log(successMsg);
            continue;
        }
        // grab last error message - for checkbox questions
        const errorMsgSelector = (field as IFormField).selector.find('.v-messages.error--text').nth(-1);
        const textContent = await errorMsgSelector.textContent;
        await t.expect(errorMsgSelector.visible).ok(`${fieldName}: failed`);
        if (errorMessages && errorMessages[fieldName])
            await t.expect(textContent).eql(errorMessages[fieldName], `${fieldName}: failed - incorrect error message`);
        else await t.expect(textContent).match(/Required/i, `${fieldName}: failed - error message missing the word "required"`);
        console.log(successMsg);
    }

    if (taker) await taker.takeFullpageScreenshot('required-fields');
    console.log('\n');
}
