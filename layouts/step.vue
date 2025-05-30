<template>
    <v-app id="main-layout" :class="{ ...brkPoints }">
        <Header></Header>
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
                        <EpicSpinner v-once :animation-duration="2000" :size="80" color="primary" />
                    </client-only>
                </v-layout>
                <v-row justify="center">
                    <v-col cols="12" md="10" lg="8" xl="6">
                        <v-stepper v-model="currentStep" alt-labels class="pa-4 mb-5">
                            <v-stepper-header>
                                <v-stepper-step step="1">Eligibility</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="2">Patient Information</v-stepper-step>
                                <v-divider></v-divider>
                                <v-stepper-step step="3">Thank you</v-stepper-step>
                            </v-stepper-header>
                            <nuxt />
                        </v-stepper>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <div v-if="layout.configuration.footerType === 'static'" class="spacer" />
        <FloatingFooter v-if="layout.configuration.footerType === 'floating'" />
        <Footer
            v-if="layout.configuration.footerType !== 'floating'"
            :isFixed="layout.configuration.footerType === 'static'"
            :brkPoints="brkPoints"
        />
    </v-app>
</template>

<style lang="scss" scoped>
.spacer {
    height: 250px;
}
.application {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
}

.fore-front {
    z-index: 201;
}

.active {
    background-color: var(--color-primary) !important;
}

.flex-content {
    flex: 1 0 auto;
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

.logo {
    // flex-grow: 0;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
}
</style>

<style lang="scss">
.v-application--wrap {
    font-family: 'Brandon_Text';

    h1.display-1,
    h2.display-1,
    h3.display-1 {
        color: var(--color-secondary);
        margin-bottom: 16px;
    }
}

.v-stepper .v-stepper__header {
    box-shadow: none;

    .v-stepper__label {
        text-align: center;
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import { Resolve } from 'vue-di';
import LayoutModule from '../store/layout';
import Header from '~/components/Header/Header.vue';
import Footer from '~/components/Footer/Footer.vue';
import FloatingFooter from '~/components/Footer/FloatingFooter.vue';
import StaticFooter from '~/components/Footer/StaticFooter.vue';
import ScrollingFooter from '~/components/Footer/ScrollingFooter.vue';

@Component<StepLayout>({
    components: {
        Header,
        Footer,
        StaticFooter,
        ScrollingFooter,
        FloatingFooter,
    },
    mounted() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((this as any).$meta) (this as any).$meta().refresh();
    },
})
export default class StepLayout extends Vue {
    @Resolve
    public layout!: LayoutModule;
    get currentStep() {
        switch (this.$store.state.route.name) {
            case 'need-a-card-eligibility':
                return 1;
            case 'need-a-card-patient-information':
                return 2;
            case 'need-a-card-success':
                return 3;
            default:
                return 1;
        }
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
