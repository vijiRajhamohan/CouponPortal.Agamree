import Vue from 'vue';
import Vuetify from 'vuetify';
import { Context } from '@nuxt/types';
import icons from '~/settings/icons';
import theme from '~/settings/theme';
import asterisk from '~/components/asterisk.vue';
const values = icons(Vue);

Vue.use(Vuetify);

export default (context: Context, inject: (name: string, value: unknown) => void) => {
    context.app.vuetify = new Vuetify({
        theme,
        icons: {
            iconfont: 'fa',
            values: {
                ...values,
                asterisk: {
                    // name of our custom icon
                    component: asterisk, // our custom component
                },
            },
        },
    });
    context.$vuetify = context.app.vuetify;
};
