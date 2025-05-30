/* eslint-disable @typescript-eslint/explicit-member-accessibility, @typescript-eslint/class-name-casing, @typescript-eslint/no-explicit-any */
declare module '*.vue' {
    // eslint-disable-next-line import/no-duplicates
    import Vue from 'vue';
    export default Vue;
}
type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type NullableObject<T> = { [P in keyof T]: T[P] | null };

declare module 'vue-upload-component' {
    import FileUpload from 'vue-upload-component';
    export default FileUpload;
    export interface VUFile {
        file: File;
        readonly fileObject: boolean;
        id: string | number;
        size: number;
        name: string;
        type: string;
        active: boolean;
        error: string;
        success: boolean;
        putAction: string;
        postAction: string;
        headers: object;
        data: object;
        timeout: number;
        response: object | string;
        progress: string;
        speed: number;
        xhr: XMLHttpRequest;
        iframe: Element;
    }
}

declare module 'vuetify-loader/lib/plugin' {
    export default class {}
}
declare module '@rj-pkgs/vue-the-mask' {
    export interface Config {
        masked: boolean;
        mask: string | string[];
        tokens: {
            [key: string]: { escape: true } | { pattern: RegExp; transform?: (value: string) => string };
            '#'?: { pattern: RegExp };
            X?: { pattern: RegExp };
            S?: { pattern: RegExp };
            A?: { pattern: RegExp; transform: (value: string) => string };
            a?: { pattern: RegExp; transform: (value: string) => string };
            '!'?: { escape: true };
        };
    }
    export const mask: Vue.DirectiveOptions;
    export const tokens: Config[tokens];
    export function masker(value: string, mask: string | string[], masked?: boolean, tokens: Config[tokens]): string;
    export default { install(): void; };
}

declare module 'vuelidate-error-extractor' {
    import { ThisTypedComponentOptionsWithRecordProps, ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
    import { Validation, Validation } from 'vuelidate';

    export interface Error {
        readonly $invalid: boolean;
        readonly $dirty: boolean;
        readonly $error: boolean;
        readonly $params: { [attr: string]: any };
        readonly validationKey: string;
        readonly hasError: boolean;
        readonly params: { [attr: string]: any };
    }

    export type MulitErrorExtractorMixin = ThisTypedComponentOptionsWithRecordProps<
        Vue,
        {},
        { getErrorMessage(key: string, params: any): string },
        {
            readonly activeErrors: boolean;
            readonly mergedMessages: string[];
            readonly formMessages: string[];
            readonly firstError: Error | undefined;
            readonly firstErrorMessage: string | undefined;
            readonly hasErrors: boolean;
            readonly activeErrorMessages: string[];
            readonly preferredValidator: Validation;
            readonly formValidator: Validation;
            readonly mergedAttributes: { [key: string]: string };
            readonly errors: Error[];
        },
        {
            validator: Validation;
            messages: { [message: string]: string };
            attributes: { [key: string]: string };
        }
    >;

    export type SingleErrorExtractorMixin = ThisTypedComponentOptionsWithRecordProps<
        Vue,
        {},
        { getErrorMessage(key: string, params: any): string },
        {
            readonly activeErrors: boolean;
            readonly mergedMessages: string[];
            readonly formMessages: string[];
            readonly firstError: Error | undefined;
            readonly firstErrorMessage: string | undefined;
            readonly hasErrors: boolean;
            readonly activeErrorMessages: string[];
            readonly preferredValidator: Validation;
            readonly formValidator: Validation;
            readonly errors: Error[];
            readonly events: { input: Function };
            readonly isValid: boolean;
            readonly resolvedAttribute: string;
        },
        {
            validator: Validation;
            messages: { [message: string]: string };
            label: string;
            attribute: string;
            name: string;
            validatorParams: object;
            showSingleError: boolean;
        }
    >;

    export type FormWrapper = ThisTypedComponentOptionsWithArrayProps<
        Vue,
        {},
        {},
        {},
        {
            validator: Validation;
            messages: { [message: string]: string };
        }
    >;

    export const singleErrorExtractorMixin: SingleErrorExtractorMixin;
    export const multiErrorExtractorMixin: MulitErrorExtractorMixin;
    export const templates: { FormWrapper };
    export default {} as PluginObject<T>;
}

declare module 'epic-spinners' {
    // eslint-disable-next-line import/no-duplicates
    import Vue from 'vue';
    export const AtomSpinner: typeof Vue;
    export const BreedingRhombusSpinner: typeof Vue;
    export const CirclesToRhombusesSpinner: typeof Vue;
    export const FingerprintSpinner: typeof Vue;
    export const FlowerSpinner: typeof Vue;
    export const FulfillingBouncingCircleSpinner: typeof Vue;
    export const FulfillingSquareSpinner: typeof Vue;
    export const HalfCircleSpinner: typeof Vue;
    export const HollowDotsSpinner: typeof Vue;
    export const IntersectingCirclesSpinner: typeof Vue;
    export const LoopingRhombusesSpinner: typeof Vue;
    export const OrbitSpinner: typeof Vue;
    export const PixelSpinner: typeof Vue;
    export const RadarSpinner: typeof Vue;
    export const ScalingSquaresSpinner: typeof Vue;
    export const SelfBuildingSquareSpinner: typeof Vue;
    export const SemipolarSpinner: typeof Vue;
    export const SpringSpinner: typeof Vue;
    export const SwappingSquaresSpinner: typeof Vue;
    export const TrinityRingsSpinner: typeof Vue;
}

declare module 'testcafe-vue-selectors' {
    export interface VueSelectorPromise extends SelectorPromise, VueSelectorAPI, Promise<VueSnapshot> {}
    interface VueSelector extends VueSelectorAPI {
        (...args: any[]): VueSelectorPromise;
        getVue(): Promise<VueData>;
    }

    interface VueSnapshot extends NodeSnapshot {
        getVue(): Promise<VueData>;
    }

    interface VueData {
        props: any;
        state: any;
        computed: any;
        ref: any;
    }

    // type VueSelector = Selector;
    type VueSelectorFunction<T extends (...args: any[]) => any> = ReturnType<T> extends Selector
        ? (...args: Parameters<T[P]>) => VueSelector
        : T;

    type NonSelectors = {
        [P in keyof SelectorAPI]: SelectorAPI[P] extends (...args: any[]) => any
            ? ReturnType<SelectorAPI[P]> extends Selector
                ? never
                : SelectorAPI[P]
            : SelectorAPI[P];
    };

    interface VueSelectorAPI extends NonSelectors {
        /**
         * Creates a selector that returns an element by its index in the matching set.
         *
         * @param index - A zero-based index of the element. If negative, then counted from the end of the matching set.
         */
        nth(index: number): VueSelector;
        /**
         * Creates a selector that filters a matching set by the specified text.
         *
         * @param text - The text in the element.
         */
        withText(text: string | RegExp): VueSelector;
        /**
         * Creates a selector that filters a matching set by the specified text. Selects elements whose text content *strictly matches* this text.
         *
         * @param text - The text in the element.
         */
        withExactText(text: string): VueSelector;
        /**
         * Creates a selector that filters a matching set by the specified attribute and, optionally, attribute value.
         *
         * @param attrName - The attribute name.
         * @param attrValue - The attribute value.You can omit this parameter to select elements that have
         * the `attrName` attribute regardless of the value.
         */
        withAttribute(attrName: string | RegExp, attrValue?: string | RegExp): SelectorPromise;
        /**
         * Creates a selector that filters a matching set by cssSelector.
         *
         * @param cssSelector - A CSS selector string.
         */
        filter(cssSelector: string): VueSelector;
        /**
         * Creates a selector that filters a matching set by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current DOM node.
         * @param filterFn `idx` - Index of the current node among other nodes in the matching set.
         * @param dependencies - Predicate dependencies.
         */
        filter(filterFn: (node: Element, idx: number) => boolean, dependencies?: { [key: string]: any }): VueSelector;
        /**
         * Creates a selector that filters a matching set leaving only visible elements.
         */
        filterVisible(): VueSelector;
        /**
         * Creates a selector that filters a matching set leaving only hidden elements.
         */
        filterHidden(): VueSelector;
        /**
         * Finds all descendants of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        find(cssSelector: string): VueSelector;
        /**
         * Finds all descendants of all nodes in the matching set and filters them using `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current descendant node.
         * @param filterFn `idx` - A zero-based index of `node` among other descendant nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set whose descendants are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        find(filterFn: (node: Element, idx: number, originNode: Element) => boolean, dependencies?: { [key: string]: any }): VueSelector;
        /**
         * Finds all parents of all nodes in the matching set (first element in the set will be the closest parent).
         */
        parent(): VueSelector;
        /**
         * Finds all parents of all nodes in the matching set and filters them by `index`.
         *
         * @param index - A zero-based index of the parent (0 is the closest). If negative, then counted from the end of the matching set.
         */
        parent(index: number): VueSelector;
        /**
         * Finds all parents of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        parent(cssSelector: string): VueSelector;
        /**
         * Finds all parents of all nodes in the matching set and filters them by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current parent node.
         * @param filterFn `idx` - A zero-based index of `node` among other parent nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set whose parents are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        parent(filterFn: (node: Element, idx: number, originNode: Element) => boolean, dependencies?: { [key: string]: any }): VueSelector;
        /**
         * Finds all child elements (not nodes) of all nodes in the matching set.
         */
        child(): VueSelector;
        /**
         * Finds all child elements (not nodes) of all nodes in the matching set and filters them by `index`.
         *
         * @param index - A zero-based index of the child. If negative, then counted from the end of the matching set.
         */
        child(index: number): VueSelector;
        /**
         * Finds all child elements (not nodes) of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        child(cssSelector: string): VueSelector;
        /**
         * Finds all child elements (not nodes) of all nodes in the matching set and filters them by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current child node.
         * @param filterFn `idx` - A zero-based index of `node` among other child nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set children parents are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        child(filterFn: (node: Element, idx: number, originNode: Element) => boolean, dependencies?: { [key: string]: any }): VueSelector;
        /**
         * Finds all sibling elements (not nodes) of all nodes in the matching set.
         */
        sibling(): VueSelector;
        /**
         * Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by `index`.
         *
         * @param index -  a zero-based index of the sibling. If negative, then counted from the end of the matching set.
         */
        sibling(index: number): VueSelector;
        /**
         * nds all sibling elements (not nodes) of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        sibling(cssSelector: string): VueSelector;
        /**
         * Finds all sibling elements (not nodes) of all nodes in the matching set and filters them by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current sibling node.
         * @param filterFn `idx` - A zero-based index of `node` among other sibling nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set whose siblings are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        sibling(filterFn: (node: Element, idx: number, originNode: Element) => boolean, dependencies?: { [key: string]: any }): VueSelector;
        /**
         * Finds all succeeding sibling elements (not nodes) of all nodes in the matching set.
         */
        nextSibling(): VueSelector;
        /**
         * Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by `index`.
         *
         * @param index - A zero-based index of the succeeding sibling. If negative, then counted from the end of the matching set.
         */
        nextSibling(index: number): VueSelector;
        /**
         * Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        nextSibling(cssSelector: string): VueSelector;
        /**
         * Finds all succeeding sibling elements (not nodes) of all nodes in the matching set and filters them by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current succeeding sibling node.
         * @param filterFn `idx` - A zero-based index of `node` among other succeeding sibling nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set whose succeeding siblings are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        nextSibling(
            filterFn: (node: Element, idx: number, originNode: Element) => boolean,
            dependencies?: { [key: string]: any }
        ): VueSelector;
        /**
         * Finds all preceding sibling elements (not nodes) of all nodes in the matching set.
         */
        prevSibling(): VueSelector;
        /**
         *  Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by `index`.
         *
         * @param index - A zero-based index of the preceding sibling. If negative, then counted from the end of the matching set.
         */
        prevSibling(index: number): VueSelector;
        /**
         * Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by `cssSelector`.
         *
         * @param cssSelector - A CSS selector string.
         */
        prevSibling(cssSelector: string): VueSelector;
        /**
         * Finds all preceding sibling elements (not nodes) of all nodes in the matching set and filters them by the `filterFn` predicate.
         *
         * @param filterFn - The predicate.
         * @param filterFn `node` - The current preceding sibling node.
         * @param filterFn `idx` - A zero-based index of `node` among other preceding sibling nodes.
         * @param filterFn `originNode` - A node from the left-hand selector's matching set whose preceding siblings are being iterated.
         * @param dependencies - Predicate dependencies.
         */
        prevSibling(
            filterFn: (node: Element, idx: number, originNode: Element) => boolean,
            dependencies?: { [key: string]: any }
        ): VueSelector;
        /**
         * `true if` at least one matching element exists.
         */
        exists: Promise<boolean>;
        /**
         * The number of matching elements.
         */
        count: Promise<number>;
        /**
         *  Adds custom selector properties.
         *
         * @param props - Property descriptors.
         * @param props `prop` - Property name.
         * @param props `[prop]` - The function that calculate property values. Executed on the client side in the browser.
         * @param props `node` - The matching DOM node for which custom property is calculated.
         */
        addCustomDOMProperties(props: { [prop: string]: (node: Element) => any }): VueSelector;
        /**
         * Adds custom selector methods.
         *
         * @param methods - Method descriptors.
         * @param methods `method` - The method name.
         * @param methods `[method]` - The function that contains method code. Executed on the client side in the browser.
         * @param methods `node` - The matching DOM node for which custom method is executed.
         * @param methods `methodParams` - Custom method parameters.
         */
        addCustomMethods(
            methods: { [method: string]: (node: Element, ...methodParams: any[]) => any },
            opts?: { returnDOMNodes?: boolean }
        ): VueSelector;
        /**
         * Returns a new selector with a different set of options that includes options from the
         * original selector and new `options` that overwrite the original ones.
         *
         * @param options - New options.
         */
        with(options?: SelectorOptions): VueSelector;
    }

    // type VueSelectorAPI<T> = {
    //     [P in keyof T]:
    //     T[P] extends { (selector: string) : VueSelector; (...args: any[]) : VueSelector; }
    //     ?
    //     T[P] extends (selector: string) => Selector
    //     ? (selector: string) => VueSelector
    //     : T[P] extends (...args: any[]) => Selector
    //     ? (...args: Parameters<T[P]>) => VueSelector
    //     : T[P]
    // };

    const VueSelector: VueSelector;

    export default VueSelector;
    // type VueSelectorAPI<K extends keyof SelectorAPI> = SelectorAPI[K] extends Selector ? VueSelectorAPI
    // type a = Record<string, string>;
    // export default function(selector?: string): SelectorPromise & {
    // getVue(): Promise<{
    //     props: any;
    //     state: any;
    //     computed: any;
    //     ref: any;
    // }>
    // };
}

declare module 'vuetify-loader/lib/plugin' {
    export default class {}
}

declare module 'vuelidate-error-extractor' {
    export interface Error {
        readonly $invalid: boolean;
        readonly $dirty: boolean;
        readonly $error: boolean;
        readonly $params: { [attr: string]: any };
        readonly validationKey: string;
        readonly hasError: boolean;
        readonly params: { [attr: string]: any };
    }

    export type MulitErrorExtractorMixin = ThisTypedComponentOptionsWithRecordProps<
        Vue,
        {},
        { getErrorMessage(key: string, params: any): string },
        {
            readonly activeErrors: boolean;
            readonly mergedMessages: string[];
            readonly formMessages: string[];
            readonly firstError: Error | undefined;
            readonly firstErrorMessage: string | undefined;
            readonly hasErrors: boolean;
            readonly activeErrorMessages: string[];
            readonly preferredValidator: Validation;
            readonly formValidator: Validation;
            readonly mergedAttributes: { [key: string]: string };
            readonly errors: Error[];
        },
        {
            validator: Validation;
            messages: { [message: string]: string };
            attributes: { [key: string]: string };
        }
    >;

    export type SingleErrorExtractorMixin = ThisTypedComponentOptionsWithRecordProps<
        Vue,
        {},
        { getErrorMessage(key: string, params: any): string },
        {
            readonly activeErrors: boolean;
            readonly mergedMessages: string[];
            readonly formMessages: string[];
            readonly firstError: Error | undefined;
            readonly firstErrorMessage: string | undefined;
            readonly hasErrors: boolean;
            readonly activeErrorMessages: string[];
            readonly preferredValidator: Validation;
            readonly formValidator: Validation;
            readonly errors: Error[];
            readonly events: { input: Function };
            readonly isValid: boolean;
            readonly resolvedAttribute: string;
        },
        {
            validator: Validation;
            messages: { [message: string]: string };
            label: string;
            attribute: string;
            name: string;
            validatorParams: object;
            showSingleError: boolean;
        }
    >;

    export type FormWrapper = ThisTypedComponentOptionsWithArrayProps<
        Vue,
        {},
        {},
        {},
        {
            validator: Validation;
            messages: { [message: string]: string };
        }
    >;

    export const singleErrorExtractorMixin: SingleErrorExtractorMixin;
    export const multiErrorExtractorMixin: MulitErrorExtractorMixin;
    export const templates: { FormWrapper };
    export default {} as PluginObject<T>;
}

declare module 'epic-spinners' {
    export const AtomSpinner: typeof Vue;
    export const BreedingRhombusSpinner: typeof Vue;
    export const CirclesToRhombusesSpinner: typeof Vue;
    export const FingerprintSpinner: typeof Vue;
    export const FlowerSpinner: typeof Vue;
    export const FulfillingBouncingCircleSpinner: typeof Vue;
    export const FulfillingSquareSpinner: typeof Vue;
    export const HalfCircleSpinner: typeof Vue;
    export const HollowDotsSpinner: typeof Vue;
    export const IntersectingCirclesSpinner: typeof Vue;
    export const LoopingRhombusesSpinner: typeof Vue;
    export const OrbitSpinner: typeof Vue;
    export const PixelSpinner: typeof Vue;
    export const RadarSpinner: typeof Vue;
    export const ScalingSquaresSpinner: typeof Vue;
    export const SelfBuildingSquareSpinner: typeof Vue;
    export const SemipolarSpinner: typeof Vue;
    export const SpringSpinner: typeof Vue;
    export const SwappingSquaresSpinner: typeof Vue;
    export const TrinityRingsSpinner: typeof Vue;
}
