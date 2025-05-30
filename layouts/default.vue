<template>
    <v-app id="main-layout" :class="{ ...brkPoints, 'closed-iri-popup': !iriOpen }">
        <Header />
        <v-content>
            <v-container fluid class="pa-0 d-block flex-content main-container">
                <v-layout
                    v-if="$wait.is('nuxt') || $wait.is('nuxt-step') || $wait.is('nuxt-child')"
                    ref="nuxt-spinner"
                    align-center
                    justify-center
                    column
                    class="loader"
                >
                    <client-only>
                        <EpicSpinner v-once :animation-duration="2000" :size="80" :color="theme.primary" />
                    </client-only>
                </v-layout>
                <nuxt />
            </v-container>
        </v-content>
        <div v-if="layout.configuration.footerType === 'static'" class="spacer" />
        <FloatingFooter v-if="layout.configuration.footerType === 'floating'" />
        <Footer v-if="layout.configuration.footerType !== 'floating'" :isFixed="layout.configuration.footerType === 'static'" :brkPoints="brkPoints" />
    </v-app>
</template>

<style lang="scss" scoped>
.spacer {
    height: 250px;
}
.main-container {
    height: 100%;
    background: var(--color-mainBackground);
}

html {
    height: 100vh;
}

nav.main-nav-header {
    position: unset;
}
.v-application {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}
.fore-front {
    z-index: 201;
}

.flex-content {
    flex: 1 0 auto;
}

footer.v-footer.footer-clearfix {
    height: unset !important;
}

p.brand-header-subtext {
    margin: 0;
}

.theme--light.v-footer {
    background: transparent;
}

.v-application {
    font-family: 'Brandon_Text';
}

.loader {
    position: fixed; // changed to avoid the spacing around backdrop
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    min-height: 100vh;
    max-height: 100vw;
    background: rgba(0, 0, 0, 0.4);
    transition: opacity 0.3s;
}
.custom-fill-height {
    min-height: 100vh;
}

.logo-link {
    height: 100%;
    min-height: 100%;
    max-height: 100%;
}
.logo {
    // flex-grow: 0;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
}
.username {
    color: $white;
    display: block;
    padding: 0.25em 0 0.5em;
}
.toolbar-main {
    background: $white;
    border-style: solid;
    border-color: var(--color-secondary);
    border-width: 0px 0px 6px 0px;
}
.iri-info {
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: visible;
}
.iri-card {
    border-top: solid var(--color-active) 1rem;
    box-sizing: border-box;
}
.iri-popup {
    overflow: show;
}
.footer-text {
    background-color: var(--color-neutralLight);
    color: var(--color-brandGrey);
}
</style>

<style lang="scss">
.half-circle-spinner {
    .circle-1 {
        border-top-color: var(--color-primary) !important;
    }
    .circle-2 {
        border-bottom-color: #197cb9 !important;
    }
}
.main-menu {
    z-index: 6;
    .v-list__tile--active,
    .primary--text {
        color: var(--color-active) !important;
    }
    @media only all and (max-width: 959px) {
        .hidden-xs {
            display: none;
        }
    }
}
.main-nav-header {
    &.v-toolbar--fixed {
        z-index: 5;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import { Resolve } from 'vue-di';
import { faPrescription, faChevronUp, faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { mapKeys } from 'lodash';
import Header from '~/components/Header/Header.vue';
import FloatingFooter from '~/components/Footer/FloatingFooter.vue';
import Footer from '~/components/Footer/Footer.vue';
import StaticFooter from '~/components/Footer/StaticFooter.vue';
import ScrollingFooter from '~/components/Footer/ScrollingFooter.vue';
import ConfigurationDrawer from '~/components/configuration/ConfigurationDrawer.vue';
import theme from '~/settings/theme';
import SessionModule from '~/store/session';
import LayoutModule from '~/store/layout';
import IriModule from '~/store/iri';

@Component<DefaultLayout>({
    components: {
        Header,
        FloatingFooter,
        Footer,
        StaticFooter,
        ScrollingFooter,
        ConfigurationDrawer,
    },
    mounted() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((this as any).$meta) (this as any).$meta().refresh();
    },
    icons: {
        faPrescription,
        faChevronUp,
        faChevronDown,
    },
})
export default class DefaultLayout extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public iri!: IriModule;

    @Resolve
    public session!: SessionModule;
    public theme = theme;

    // Allows user to close the configuration drawer by hitting escape
    created() {
        window.addEventListener('keyup', e => {
            if (e.key === 'Escape') {
                this.drawer = false;
            }
        });
    }

    // @Watch('layout.configuration.programName', {deep: true})
    // public watchProgramName(programName: string) {
    //     this.layout.replaceProgramName(programName, this.layout.previousProgramName)
    // }

    @Watch('layout.configuration.colors', { deep: true, immediate: true })
    public setInitialColors(configuration: typeof LayoutModule.prototype.configuration) {
        Object.entries(this.layout.configuration.colors).forEach(([name, color]) => {
            document.documentElement.style.setProperty(`--color-${name}`, color.toUpperCase());
            this.$vuetify.theme.themes.light[name] = color.toUpperCase();
        })
    }


    public get drawer() {
        return this.layout.drawer;
    }
    public set drawer(v) {
        this.layout.setDrawer(v);
    }
    public get mini() {
        return this.layout.mini;
    }
    public set mini(v) {
        this.layout.setMini(v);
    }
    public get iriOpen() {
        return this.iri.open;
    }
    public set iriOpen(v) {
        this.iri.toggleIriOpen(v);
    }

    public get menu(): object {
        return this.$settings.mainMenu;
    }
    public back() {
        this.$router.back();
    }

    public get brkPoints() {
        return {
            'brk-xs': this.$vuetify.breakpoint.xs,
            'brk-xs-only': this.$vuetify.breakpoint.xsOnly,
            'brk-sm': this.$vuetify.breakpoint.sm,
            'brk-sm-only': this.$vuetify.breakpoint.smOnly,
            'brk-sm-and-down': this.$vuetify.breakpoint.smAndDown,
            'brk-sm-and-up': this.$vuetify.breakpoint.smAndUp,
            'brk-md': this.$vuetify.breakpoint.md,
            'brk-md-only': this.$vuetify.breakpoint.mdOnly,
            'brk-md-and-down': this.$vuetify.breakpoint.mdAndDown,
            'brk-md-and-up': this.$vuetify.breakpoint.mdAndUp,
            'brk-lg': this.$vuetify.breakpoint.lg,
            'brk-lg-only': this.$vuetify.breakpoint.lgOnly,
            'brk-lg-and-down': this.$vuetify.breakpoint.lgAndDown,
            'brk-lg-and-up': this.$vuetify.breakpoint.lgAndUp,
            'brk-xl': this.$vuetify.breakpoint.xl,
            'brk-xl-only': this.$vuetify.breakpoint.xlOnly,
        };
    }
}
</script>
