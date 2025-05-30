/* eslint-disable no-console */
import { Selector } from 'testcafe';

// import test types
import { ITextInput } from '../@types/forms/form-fields/text';

// import test utils
import { IncrementalScreenshotTaker } from './takeBrowserScreenshot';

export default async function checkInvalidValues(
    t: TestController,
    textInput: ITextInput,
    errorMessages: { [key: string]: string },
    taker?: IncrementalScreenshotTaker
) {
    console.log('Check Invalid Values');
    if (!textInput.invalidValues) throw new Error('Input missing invalidValues property');
    for (const value in textInput.invalidValues) {
        await t.typeText(textInput.selector, textInput.invalidValues[value]).click(Selector('body'));
        await t.expect(textInput.selector.find('.error--text').withText(errorMessages[value]).visible).ok(`${value}: failed`);
        if (taker) await taker.takeFullpageScreenshot(value);
        console.log(`${value}: passed`);
        await t.click(textInput.selector).pressKey('ctrl+a delete');
    }
    console.log('\n');
}
