<template>
    <div v-resize="updateWindow" class="inner-footer">
        <div id="fixed-footer" v-scroll="updateWindow" :class="{ 'd-none': !aboveStaticFooter }">
            <v-flex xs12 class="relative">
                <v-flex id="peeking-iri" class="collapsed-iri">
                    <div v-if="aboveStaticFooter" class="footer-top-bar">
                        <v-container fluid class="py-0">
                            <v-row>
                                <v-col cols="12" lg="10" offset-lg="1" class="py-0 px-lg-0">
                                    <v-row justify="space-between">
                                        <v-col class="pt-0 pb-0">
                                            <h3 :class="{ 'top-bar-text': true }">
                                                IMPORTANT SAFETY INFORMATION, INCLUDING BOXED WARNING
                                            </h3>
                                        </v-col>
                                        <v-col class="py-0 pl-0 text-right flex-grow-0">
                                            <fa-icon
                                                size="2x"
                                                :icon="$icons.faChevronDown"
                                                :style="{ 'pointer-events': aboveStaticFooter ? 'auto' : undefined }"
                                                class="fore-front text--white shift-up caret"
                                                @click="handleClick"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                    <isi-info class="pa-2 pb-4 pt-0"></isi-info>
                </v-flex>
            </v-flex>
        </div>
        <v-btn
            v-if="!aboveStaticFooter"
            id="btn_back-to-top"
            ref="iri-button"
            fab
            color="primary"
            :style="{ 'pointer-events': aboveStaticFooter ? 'auto' : undefined }"
            fixed
            right
            bottom
            @click="handleClick"
        >
            <fa-icon size="2x" :icon="$icons.faChevronUp" />
        </v-btn>
        <div id="static-footer">
            <isi-info class="pa-2 pb-4 pt-0"></isi-info>
            <Footer :brk-points="brkPoints" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer-top-bar {
    background: $primary;
    color: white;
}

.v-application ul {
    padding-left: 0;
}
.add-border {
    border-right: solid #ffffff 1px;
}
.inner-footer {
    transition: all;
}
#fixed-footer {
    position: fixed;
    top: 100%;
    width: 100%;
    left: 0;
    transform: translateY(-100%);
    z-index: 6;
    background-color: #ffffff;
    font-size: 10pt;
    box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.22);
    min-height: calc(27vh - 2em);
    height: calc(27vh - 2em);
    max-height: calc(27vh - 2em);
    .collapsed-iri {
        overflow: hidden;
    }
}
.shift-right {
    left: 50% !important;
    transform: translateX(-50%);
}
.fore-front {
    z-index: 7;
}
.iri-info {
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: visible;
}
.rights {
    padding: 1em 3em 0;
}
.pull-left {
    right: 6.5em;
}

.top-bar-text {
    color: white;
    font-weight: bold;
}

.pharma-button {
    height: 3.5em;
    box-sizing: border-box;
    padding: 0.75em;
}
.v-bottom-sheet.v-dialog {
    max-height: none;
}
.pharma-search-container {
    max-height: 100vh;
    overflow-y: scroll;
}

.v-application p {
    margin-bottom: 0;
}
</style>
<style>
.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100vh !important;
}
</style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';
import { Resolve } from 'vue-di';
import { faChevronUp, faChevronDown } from '@fortawesome/pro-regular-svg-icons';
import { mapKeys } from 'lodash';
import ISIInfo from '~/components/isi-info/isi-info.vue';
import Footer from '~/components/Footer/Footer.vue';
import theme from '~/settings/theme';
import SessionModule from '~/store/session';
import LayoutModule from '~/store/layout';
import IriModule from '~/store/iri';
import FooterModule from '~/store/footer';

@Component<FloatingFooter>({
    components: {
        isiInfo: ISIInfo,
        Footer,
    },
    icons: {
        faChevronUp,
        faChevronDown,
    },
    created() {},
})
export default class FloatingFooter extends Vue {
    @Resolve
    public iri!: IriModule;

    @Resolve footer!: FooterModule

    public win = {
        h: 0,
        y: 0,
        x: 0,
    };

    public doc = {
        h: 0,
        w: 0,
    };

    public fixedFooter = {
        h: 0,
        w: 0,
    };

    public get staticFooter() {
        return this.footer.staticFooter;
    }

    public get iriOpen() {
        return this.iri.open;
    }

    public set iriOpen(v) {
        this.iri.toggleIriOpen(v);
    }

    public get aboveStaticFooter() {
        return this.win.y + this.win.h - this.fixedFooter.h < this.staticFooter.y;
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

    handleClick() {
        this.aboveStaticFooter
            ? this.$vuetify.goTo('#fixed-footer', {
                  duration: 1000,
                  easing: 'easeInOutCubic',
                  offset: 0,
              })
            : this.$vuetify.goTo('#main-layout', {
                  duration: 1000,
                  easing: 'easeInOutCubic',
                  offset: 0,
              });
    }

    mounted() {
        this.updateWindow();
    }

    public updateWindow(): void {
        this.win = {
            h: window.innerHeight as number,
            x: window.innerHeight as number,
            y: window.pageYOffset as number,
        };
        const fixedFooter = document.querySelector('#fixed-footer') as HTMLElement | null;
        const staticFooter = document.querySelector('#static-footer') as HTMLElement | null;
        const doc = document.body as HTMLElement;
        if (fixedFooter) {
            this.fixedFooter = {
                h: fixedFooter.offsetHeight,
                w: fixedFooter.offsetWidth,
            };
        }
        if (staticFooter) {
            this.footer.setStaticFooter({
                y: staticFooter.offsetTop
            });
        }
        this.doc = {
            h: doc.offsetHeight,
            w: doc.offsetWidth,
        };
    }
}
</script>
