/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { CreateElement, RenderContext } from 'vue';
import { singleErrorExtractorMixin, templates, multiErrorExtractorMixin } from 'vuelidate-error-extractor';
import { Component } from 'vue-property-decorator';
import { tokens, Config } from '@rj-pkgs/vue-the-mask';

import FormSummary from './FormSummary.vue';

function getAttribute(attributes: any, attribute: any, label: any, name: any) {
    if (name === void 0) name = '';

    // if there is no name prop, we cant reach into the attributes object, so we use the label instead
    if (!name || label) {
        return label;
    }
    // if an attribute is provided, just return it as its with highest priority
    if (attribute) {
        return attribute;
    }
    // strip out the $each and fetch the attribute from the attributes object. Return the name if it does exist on the object
    const normalizedName = name.replace(/\$each\.\d\./g, '');
    return attributes[normalizedName] || normalizedName;
}

@Component<FormField>({
    computed: {
        ...singleErrorExtractorMixin.computed,
        resolvedAttribute() {
            return getAttribute(
                (this as any).$vuelidateErrorExtractor.attributes,
                (this as any).attribute,
                (this as any).label,
                (this as any).name
            );
        },
    },
})
export class FormField extends Vue.extend(singleErrorExtractorMixin) {
    public get bindAttrs() {
        const item: any = {
            errorMessages: this.activeErrorMessages,
            error: this.hasErrors,
            validator: this.preferredValidator,
            // success: !this.hasErrors,
        };
        if (this.name) {
            item.name = this.name;
            item.ref = this.name;
        }
        if (this.resolvedAttribute) {
            item.label = this.label;
        }
        if (this.preferredValidator && this.preferredValidator.$params.maxLength) {
            item.counter = this.preferredValidator.$params.maxLength.max;
        }
        item.required = this.preferredValidator && !!this.preferredValidator.$params.required;
        item['prepend-inner-icon'] = item.required ? '$vuetify.icons.asterisk' : undefined;
        return item;
    }
    public get bindMask(): Config | null {
        if (this.preferredValidator && this.preferredValidator.$params.phone) {
            return { mask: '(###) ###-####', masked: true, tokens };
        }
        if (this.preferredValidator && this.preferredValidator.$params.zip) {
            return { mask: ['#####', '#####-####'], masked: true, tokens };
        }
        if (this.preferredValidator && this.preferredValidator.$params.zip5) {
            return { mask: '#####', masked: true, tokens };
        }
        if (this.preferredValidator && this.preferredValidator.$params.ssn4) {
            return { mask: '####', masked: true, tokens };
        }
        if (this.preferredValidator && this.preferredValidator.$params.date) {
            return { mask: '##/##/####', masked: true, tokens };
        }
        if (this.preferredValidator && this.preferredValidator.$params.currency) {
            return { mask: ['#.##', '##.##', '###.##', '####.##', '#####.##', '######.##' ], masked: true, tokens };
        }
        return null;
    }
    public get required() {
        return this.preferredValidator && !!this.preferredValidator.$params.required;
    }
    public get bindEvents() {
        return {
            blur: this.change.bind(this),
            // input: this.change.bind(this),
        };
    }
    public render(createElement: CreateElement, context: RenderContext<any>) {
        return this.$scopedSlots.default!({
            attrs: this.bindAttrs,
            required: this.required,
            label: this.label,
            events: this.bindEvents,
            mask: this.bindMask,
        }) as any;
        // return createElement('div', context.data, context.children);
    }
    private change() {
        if (this.preferredValidator && this.preferredValidator.$touch) {
            this.preferredValidator.$touch();
        }
    }
}
export { FormSummary };

@Component({})
export class FormContext extends Vue.extend(templates.FormWrapper) {
    public render(createElement: CreateElement, context: RenderContext<any>) {
        return this.$slots.default;
    }
}
