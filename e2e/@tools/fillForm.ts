/* eslint-disable no-console */
import { find, forEach, pickBy } from 'lodash';
import { Selector } from 'testcafe';
import { monthNames } from '../@data/shared/dates';
import { FormFields } from '../@types/forms/form-fields/formFields';
import { FormConditions } from '../@types/forms/formConditions';
import { ITextInputs, IMultiChoiceQuestions, IMultiChoiceAnswers, IEligibilityQuestions } from '../@types/forms';
import { ISelector } from '../@types/selectors';

export async function fillTextForm(
    t: TestController,
    textInputs: ITextInputs,
    textValues: any,
    conditions?: FormConditions,
    excludeFilled = true
) {
    console.log('Fill Text Form');
    let toFill = pickBy(textInputs, input => !excludeFilled || !input.isFilled);

    // exlude fields that don't meet the conditions arg
    toFill = filterConditionalFields(toFill, conditions) as ITextInputs;

    // loop over toFill text fields
    for (const [inputName, inputField] of Object.entries(toFill)) {
        await t.expect(inputField.selector.exists).ok(`${inputName} does not exist`);
        await t.expect(textValues[inputName]).ok(`${inputName} is missing a text value`);
        if (inputField.isEntered) {
            await t.typeText(inputField.selector, textValues[inputName]).pressKey('enter');
            continue;
        }
        if (inputField.datepicker) {
            const values = textValues[inputName].split(/\/|\\/);
            const [monthNumeric, day, year] = values;
            const month = monthNames[parseInt(monthNumeric) - 1];
            await t
                .click(inputField.selector)
                .click(Selector('.v-date-picker-title__year'))
                .click(Selector('ul.v-date-picker-years > li').withText(year))
                .click(Selector('.v-btn__content').withText(month))
                .click(Selector('.v-btn__content').withText(parseInt(day).toString()));
            continue;
        }
        await t.typeText(inputField.selector, textValues[inputName]);
        console.log(`${inputName}: filled`);
    }
    console.log('\n');
}

export async function fillMultiChoiceForm(
    t: TestController,
    questions: IMultiChoiceQuestions,
    answers: IMultiChoiceAnswers,
    conditions?: FormConditions
) {
    console.log('Fill Multi-Choice Form');
    const toFill = filterConditionalFields(questions, conditions) as IMultiChoiceQuestions;
    // answer each question
    for (const qName in toFill) {
        const selected = answers[qName];
        await t.expect(selected).ok(`Answer value not given for ${answers[qName]}`);
        // only select one answer for radio question
        if (!Array.isArray(selected)) {
            await t.expect(selected.selector.exists).ok(`Answer selector does not exist for ${qName}`);
            await t.click(selected.selector);
            console.log(`${qName}: filled`);
            continue;
        }
        // potentially select multiple answers for checkbox questions
        for (const answer of selected as ISelector[]) {
            await t.expect(answer.selector.exists).ok(`${qName} answer ${selected.indexOf(answer) + 1} does not exist`);
            await t.click(answer.selector);
        }
        console.log(`${qName}: filled`);
    }
    console.log('\n');
}

export async function answerEligibilityQuestions(t: TestController, questions: IEligibilityQuestions, isEligible = true) {
    const answers: IMultiChoiceAnswers = {};
    forEach(questions, (q, qName) => {
        const answer = find(q.options, option => (isEligible ? option.isEligible : !option.isEligible));
        answers[qName] = answer!;
    });
    await fillMultiChoiceForm(t, questions, answers);
}

export function filterConditionalFields(fields: FormFields, conditions?: FormConditions) {
    // if no conditions exist, return fields that either: have no visible conditions, or where all visible conditions are false
    if (!conditions) {
        return pickBy(
            fields,
            field => !field.isVisibleConditions || Object.values(field.isVisibleConditions).every(condition => !condition)
        );
    }
    // exclude fields that don't meet the conditions arg
    const filtered: FormFields = {};
    forEach(fields, (field, fieldName) => {
        let isVisible = true;
        let isFilled = false;
        if (field.isVisibleConditions) {
            isVisible = Object.entries(field.isVisibleConditions).some(([key, value]) => {
                const isMatch = (conditions as any)[key] === value;
                return isMatch;
            });
        }
        if (field.isFilledConditions) {
            isFilled = Object.entries(field.isFilledConditions).some(([key, value]) => {
                const isMatch = (conditions as any)[key] === value;
                return isMatch;
            });
        }
        if (isVisible && !isFilled) filtered[fieldName] = field;
    });
    return filtered;
}
