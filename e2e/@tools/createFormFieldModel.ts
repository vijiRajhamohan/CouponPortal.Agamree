import VueSelector from 'testcafe-vue-selectors';

// import { VueSelector } from './VueSelector';

export function createFormFieldModel(
    selector: string
): ReturnType<typeof import('testcafe-vue-selectors').default> & {
    label: import('testcafe-vue-selectors').default;
    input: import('testcafe-vue-selectors').default;
    root: import('testcafe-vue-selectors').default;
} {
    const s = VueSelector(`${selector}`);
    Object.defineProperty(s, 'label', {
        enumerable: true,
        configurable: false,
        value: VueSelector(selector).find('.v-label'),
    });
    Object.defineProperty(s, 'root', {
        enumerable: true,
        configurable: false,
        value: VueSelector(selector).parent('.v-input'),
    });
    Object.defineProperty(s, 'input', {
        enumerable: true,
        configurable: false,
        value: VueSelector(selector).find('input'),
    });
    return s as any;
}
