/* eslint-disabe @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Observable, Observer } from 'rxjs';
import { ExtendedVue } from 'vue/types/vue';
import { reduce, merge } from 'lodash';
import { createDecorator } from 'vue-class-component';

const subscriptionMethods = Symbol('subscriptionMethods');

type ObservableType<T> = T extends Observable<infer R> ? R : never;

export function Subscription<T>(subscription: (this: T) => Observable<any>) {
    return createDecorator((options, key) => {
        let methods: Array<() => any> | undefined = (options as any)[subscriptionMethods];
        if (!methods) {
            methods = (options as any)[subscriptionMethods] = [];

            if (typeof options.subscriptions === 'object') {
                const a = options.subscriptions;
                methods.push(function(this: any) {
                    return a;
                });
            } else if (options.subscriptions) {
                const a = options.subscriptions;
                methods.push(function(this: any) {
                    return a.call(this);
                });
            }

            options.subscriptions = function(this: any): any {
                return reduce(methods!, (acc, v) => merge(acc, v.call(this)), {});
            };
        }
        methods.push(function(this: any) {
            return { [key]: subscription.call(this) };
        });
    });
}

export function ObservableMethod<Methods extends { [P in keyof Methods]: any }, Observables extends { [P in keyof Observables]: any }>(
    options: Array<keyof Methods>
) {
    return Vue.extend({
        observableMethods: options as any[],
    }) as ExtendedVue<
        Vue,
        { [P in keyof Observables]: (Observable<Observables[P]> & Observer<Observables[P]>) },
        { [P in keyof Methods]: (value: Methods[P]) => void },
        {},
        {}
    >;
}

export function Stream<Streams extends { [P in keyof Streams]: any }>(options: Array<keyof Streams>) {
    return Vue.extend({
        observableMethods: options as any[],
    }) as ExtendedVue<Vue, { [P in keyof Streams]: (Observable<Streams[P]> & Observer<Streams[P]>) }, {}, {}, {}>;
}

export function SubscribeTo<Subscriptions extends { [P in keyof Subscriptions]: Observable<any> }, T extends Vue = Vue>(
    subscriptions: (value: T) => Subscriptions
) {
    return Vue.extend({
        subscriptions() {
            return subscriptions(this as any);
        },
    }) as ExtendedVue<
        Vue,
        {},
        {},
        { [P in keyof ReturnType<typeof subscriptions>]: ObservableType<ReturnType<typeof subscriptions>[P]> } & {
            $observables: T['$observables'] & { [P in keyof ReturnType<typeof subscriptions>]: ReturnType<typeof subscriptions>[P] };
        },
        {}
    >;
}
