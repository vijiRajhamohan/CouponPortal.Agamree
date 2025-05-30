/* eslint-disable no-console */
import { find } from 'lodash';
import { ClientFunction } from 'testcafe';

// import test types
import { ISelector } from '../@types/selectors';
import { IEligibilityQuestions } from '../@types/forms';
import { IEligibilitySelector } from '../@types/forms/form-fields/eligibility';
import { answerEligibilityQuestions, fillMultiChoiceForm } from './fillForm';

// import test utils
import { waitForPageToLoad } from './waitForPageToLoad';
import { checkPath } from './checkPath';
import { IncrementalScreenshotTaker } from './takeBrowserScreenshot';

// arguments for testing eligibility
export interface ITestEligibilityOptions {
    t: TestController;
    url: string;
    questions: IEligibilityQuestions;
    nextBtn: ISelector;
    ineligiblePath: string;
    eligiblePath: string;
    taker?: IncrementalScreenshotTaker;
    beforeNextAsyncFn?: () => Promise<void>;
}

// test eligibility helper
export async function testEligibility(options: ITestEligibilityOptions) {
    await waitForPageToLoad(options.t);
    const { questions, beforeNextAsyncFn } = options;

    // test ineligible for each question
    for (const qName in questions) {
        // note: uncomment below if need to debug by question, change the index !== 1
        // if(Object.keys(questions).indexOf(qName) !== 1) {
        //     continue
        //    }

        // build answers
        const ineligibleIndex = Object.keys(questions).indexOf(qName);
        const answers = {};
        for (const [qName, question] of Object.entries(questions)) {
            const fillIndex = Object.keys(questions).indexOf(qName);
            const answer: { [key: string]: IEligibilitySelector } = {};
            answer[qName] = find(question.options, option => (fillIndex === ineligibleIndex ? !option.isEligible : option.isEligible))!;
            Object.assign(answers, answer);
        }
        // answer ineligible
        await fillMultiChoiceForm(options.t, questions, answers);
        if (beforeNextAsyncFn) {
            await beforeNextAsyncFn();
        }
        if (options.taker) {
            await options.taker.takeFullpageScreenshot(`${qName}-answer-ineligible`);
        }
        // verify rejection page
        await options.t.click(options.nextBtn.selector);
        await checkPath(options.ineligiblePath);
        if (options.taker) {
            await options.taker.takeFullpageScreenshot(`${qName}-rejecteion`);
        }
        console.log(`ineligible-${qName}: passed`);
        // restart flow
        await ClientFunction(() => {
            (window as any).$nuxt._router.back();
        })();
    }

    // test eligible
    // note: comment below if need to test ineligible only (vice versa)
    await answerEligibilityQuestions(options.t, questions);
    if (beforeNextAsyncFn) {
        await beforeNextAsyncFn();
    }
    if (options.taker) {
        await options.taker.takeFullpageScreenshot('eligible');
    }
    await options.t.click(options.nextBtn.selector);
    await checkPath(options.eligiblePath);
    console.log('eligible-all: passed');

    if (options.taker) {
        await options.taker.takeFullpageScreenshot('eligible-next');
    }
}
