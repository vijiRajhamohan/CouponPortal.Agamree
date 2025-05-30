/* eslint-disable @typescript-eslint/no-explicit-any,  @typescript-eslint/no-var-requires */
import { existsSync } from 'fs';
import { join } from 'path';
import { Configuration, Module } from '@nuxt/types';
import { ISettingsModuleOptions, loadSettings } from '@stargate/settings';
import { ModuleThis } from '@nuxt/types/config/module';
import webpack from 'webpack';
import { localPortFile, getLocalPort } from './scripts/localhost/server-port';
require('ts-node/register/transpile-only');

const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const basePath = process.env.TF_BUILD ? '#{BasePath}#/' : '/';

const outputDirectory = process.env.TF_BUILD ? join(process.env.BUILD_ARTIFACTSTAGINGDIRECTORY!, 'dist') : 'artifacts/dist';

const options: ISettingsModuleOptions = {
    ci: !!process.env.TF_BUILD,
    packageJsonPath: join(__dirname, 'package.json'),
    tokenTemplate: '#{$}#',
    settingsPath: '~/settings/',
};

const port = existsSync(localPortFile) ? getLocalPort() : '3000'

export default async function() {
    const { settings } = await loadSettings(join(__dirname, 'settings'), options);
    const app = settings;
    return {
        server: {
            port
        },
        // mode: 'universal',
        // modern: 'server',
        mode: 'spa',
        modern: 'client',
        // modern: process.env.NODE_ENV === 'production' ? 'client' : false,

        env: {},

        /*
         ** Headers of the page
         */
        head: {
            title: process.env.NAME,
            titleTemplate(titleChunk: string) {
                if (process.env.NAME && titleChunk && titleChunk !== process.env.NAME) {
                    return `${titleChunk} :: ${process.env.NAME}`;
                }
                if (process.env.NAME) {
                    return process.env.NAME;
                }
                return titleChunk;
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: app.description },
                { hid: 'ie', 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
                { name: 'robots', content: 'noindex'},
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: `${basePath}favicon.ico` },
                {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                },
            ],
        },

        // https://pwa.nuxtjs.org/modules/meta.html#options
        meta: {
            name: app.name,
            author: app.author,
            description: app.description,
            charset: 'utf-8',
            ogSiteName: true,
            ogTitle: true,
            ogDescription: true,
            ogImage: true,
            ogHost: undefined,
            ogUrl: true,
            twitterCard: undefined,
            twitterSite: undefined,
            twitterCreator: undefined,
        },

        manifest: {
            name: app.name,
            // eslint-disable-next-line @typescript-eslint/camelcase
            short_name: app.name,
            description: app.description,
        },

        /*
         ** Customize the progress-bar color
         */
        // loading: { color: '#fff' },
        loading: '~/components/Loading.vue',
        loadingIndicator: '~/components/Loading.html',

        /*
         ** Global CSS
         */
        css: ['@fortawesome/fontawesome-svg-core/styles.css', 'vuetify/dist/vuetify.css', '~/assets/style/app.scss'],

        /*
         ** Plugins to load before mounting the App
         */
        plugins: [
            '~/plugins/vuex-persist.client.ts',
            '~/plugins/ie.ts',
            '~/plugins/mobile-detect.client.ts',
            '~/plugins/components.ts',
            '~/plugins/validation.ts',
            '~/plugins/rx.ts',
            '~/plugins/di.ts',
            '~/plugins/vue.client.ts',
            '~/plugins/ai.client.ts',
            '~/plugins/moment.ts',
            '~/plugins/vuetify-dev.ts',
        ],

        /*
         ** Nuxt.js modules
         */
        modules: [
            'vue-di/nuxt',
            ['@stargate/settings', options],
            'vue-wait/nuxt',
            'nuxt-vuex-router-sync',
            '@nuxtjs/axios',
            'nuxt-rfg-icon',
            '@nuxtjs/manifest',
            '@nuxtjs/meta',
            '@nuxtjs/markdownit',
            '@nuxtjs/style-resources',
            'nuxt-password-protect',
        ],

        buildModules: ['@nuxt/typescript-build'],

        wait: {
            useVuex: true,
        },

        typescript: {
            tslint: '',
        },

        router: {
            middleware: ['tc-password-protect'],
            base: basePath,
        },
        passwordProtect: {
            formPath: '/unlock',
            password: app.lockPassword,
            tokenSeed: 11208,
            queryString: '_pw',
            cookieName: '_password',
            cookie: {
                prefix: 'tc-ongentys',
                expires: 720
            }
        },
        /*
         ** Axios module configuration
         */
        axios: {
            // See https://github.com/nuxt-community/axios-module#options
        },

        proxy: {},

        // @nuxtjs/pwa
        'rfg-icon': {
            masterPicture: './static/icon.png',
            rfg: require('./faviconDescription.json'),
        },

        generate: {
            dir: outputDirectory,
            fallback: '200.html',
            devtools: true,
        },

        styleResources: {
            scss: ['./assets/style/variables.scss'],
        },

        vuetify: {
            defaultAssets: false,
            treeShake: true,
            customVariables: ['~/assets/style/vuetify.scss'],
            icons: {
                iconfont: 'fa',
            },
        },

        /*
         ** Build configuration
         */
        build: {
            plugins: [
                new MomentLocalesPlugin(),
                new LodashModuleReplacementPlugin({
                    shorthands: true,
                    cloning: true,
                    currying: true,
                    caching: true,
                    collections: true,
                    exotics: true,
                    guards: true,
                    metadata: true,
                    deburring: true,
                    unicode: true,
                    memoizing: true,
                    coercions: true,
                    flattening: true,
                    paths: true,
                    placeholders: true,
                }),
            ],
            transpile: [
                /vuetify[\\|\\/]lib/,
                /epic-spinners/,
                '@nuxtjs/axios',
                'bootstrap-vue',
                '@trialcard/apigateway',
                '@trialcard/authentication',
                '@trialcard/enums',
                '@trialcard/shared',
                '@trialcard/authentication/Authentication',
                'vue-di',
                'vue-di/vuex',
                'nuxt/consola',
            ],
            // transpile: [/vuetify[\\|\\/]lib/, /epic-spinners/, /vuex-persist/],
            devtools: true,
            /*
             ** You can extend webpack config here
             */
            extend(config, ctx) {
                if (ctx.isServer) {
                    config.externals = [
                        nodeExternals({
                            whitelist: [/^vuetify/],
                        }),
                    ];
                    (config.resolve || ({} as webpack.Resolve)).extensions = ['.scss'];
                    (config.module || ({} as webpack.Module)).rules = [
                        {
                            test: /\.s[ac]ss$/i,
                            loaders: ['style-loader', 'css-loader', 'sass-loader'],
                        },
                    ];
                }

                config.devtool = 'source-map';
            },
        },
        vue: {
            config: {
                warnHandler: (msg: string | null, vm: string | null, trace: string | null) => {
                    const ignoreWarnMessage = 'The .native modifier for v-on is only valid on components but it was used on <svg>.';
                    if (msg === ignoreWarnMessage) {
                        msg = null;
                        vm = null;
                        trace = null;
                    }
                },
            },
        },
    } as Configuration;
}
