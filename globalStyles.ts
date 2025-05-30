import { Module } from '@nuxt/types';

export const module: Module = function(options) {
    this.options.css!.push('~/assets/style/app.scss');
};
export default module;
