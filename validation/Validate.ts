/* eslint-disable @typescript-eslint/no-explicit-any */
import { createDecorator } from 'vue-class-component';
import { RuleDecl, DynamicDecl } from 'vue/types/options';
import { merge, cloneDeep, reduce } from 'lodash';
const validationMethods = Symbol('validationMethods');
const validationValue = Symbol('validationValue');

export function Validate(options: RuleDecl | DynamicDecl) {
    return createDecorator((componentOptions, key) => {
        const value = (componentOptions as any)[validationValue] || ((componentOptions as any)[validationValue] = {});
        let methods: Array<() => any> | undefined = (componentOptions as any)[validationMethods];
        if (!methods) {
            methods = (componentOptions as any)[validationMethods] = [];

            if (typeof componentOptions.validations === 'object') {
                merge(value, componentOptions.validations);
            } else if (componentOptions.validations) {
                const a = componentOptions.validations;
                methods.push(function(this: any) {
                    return a.call(this);
                });
            }

            // const func = flow(methods);
            componentOptions.validations = function(this: any): any {
                return reduce(methods!, (acc, v) => merge(acc, v.call(this)), cloneDeep(value));
            };
        }
        if (typeof options === 'function') {
            const f = options;
            methods.push(function(this: any) {
                return { [key]: f.call(this) };
            });
        } else {
            Object.assign(value, { [key]: options });
        }
    });
}
