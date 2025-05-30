import Vue from 'vue';
import { createDecorator, VueDecorator } from 'vue-class-component';
import { constant, find } from 'lodash';

export function Title(title: string): VueDecorator;
export function Title<T extends Vue = Vue>(titleTemplate: (this: T, titleChunk: string) => string): VueDecorator;
export function Title(title: string, routes: Array<{ name: string; title: string }>): VueDecorator;
export function Title<T extends Vue = Vue>(settings: {
    title?: string;
    titleTemplate?: (this: T, titleChunk: string) => string;
}): VueDecorator;
export function Title(
    settings:
        | { title?: string; titleTemplate?: (this: Vue, titleChunk: string) => string }
        | ((this: Vue, titleChunk: string) => string)
        | string,
    routes?: Array<{ name: string; title: string }>
) {
    let computedSettings: { title?: string; titleTemplate?: (this: Vue, titleChunk: string) => string };
    switch (typeof settings) {
        case 'string':
            computedSettings = Array.isArray(routes)
                ? {
                      title: settings,
                      titleTemplate(this: Vue, titleChunk: string) {
                          const route = find(routes, x => x.name === this.$route.name) || { title: '' };
                          if (process.env.NAME) {
                              return `${titleChunk} - ${route.title} :: ${process.env.NAME}`;
                          }
                          return `${titleChunk} - ${route.title}`;
                      },
                  }
                : { title: settings };
            break;
        case 'function':
            computedSettings = { titleTemplate: settings };
            break;
        case 'object':
            computedSettings = settings;
            break;
        default:
            computedSettings = {};
            break;
    }
    return createDecorator(options => {
        if (!options.head) {
            options.head = function() {
                return {};
            };
        }
        if (typeof options.head === 'object') {
            options.head = constant(options.head);
        }
        const fn = options.head;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.head = function(this: any) {
            return { ...fn.call(this), ...computedSettings };
        };
    });
}
