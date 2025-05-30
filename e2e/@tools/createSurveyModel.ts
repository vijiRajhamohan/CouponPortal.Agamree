import VueSelector from 'testcafe-vue-selectors';

// import {VueSelector} from './VueSelector';

export function createSurveyModel<T extends Record<string, string | number | null>>(
    selector: string,
    keys: T
): ReturnType<typeof import('testcafe-vue-selectors').default> & {
    label: import('testcafe-vue-selectors').default;
    input: import('testcafe-vue-selectors').default;
} & { [P in keyof T]: import('testcafe-vue-selectors').default } {
    const s = VueSelector(selector);

    Object.defineProperty(s, 'label', {
        enumerable: true,
        configurable: false,
        value: VueSelector(selector).find('.v-label'),
    });

    Object.defineProperty(s, 'input', {
        enumerable: true,
        configurable: false,
        value: VueSelector(selector).find('.v-input'),
    });

    for (const [key, value] of Object.entries(keys)) {
        Object.defineProperty(s, key, {
            enumerable: true,
            configurable: false,
            value:
                typeof value === 'number'
                    ? VueSelector(`${selector} v-radio`)
                          .nth(value)
                          .find('input')
                    : VueSelector(`${selector} v-radio`)
                          .withText(new RegExp(value || key || ('' as any), 'i'))
                          .find('input'),
        });
    }

    return s as any;
}
