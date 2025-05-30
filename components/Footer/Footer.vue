<template>
    <v-footer
        :fixed="isFixed"
        :class="{
            'pa-0': true,
            'inner-footer': true,
            'drawer-pad': brkPoints['brk-md-and-up'] && layout.drawer && layout.configuration.footerType !== 'floating',
        }"
    >
        <v-container>
        <v-content class="footer-container pt-0">
            <v-row :order="footerInfoLinkLocation === 'top' ? 1 : 0" class="footer-bottom" justify="center">
                    <!-- <v-row justify="center">
                        <img
                            v-if="layout.configuration.showFooterLogo"
                            id="footer-logo"
                            :src="footerLogoSrc"
                            :alt="`${$settings.name} logo`"
                            class="footer-logo"
                        />
                    </v-row> -->
                    <v-row justify="center" class="text-center">
                        <v-col
                            cols="11"
                            md="3"
                        >
                            <p>
                                <sup>©</sup>2024 Catalyst Pharmaceuticals, Inc.
                            </p>
                        </v-col>
                        <v-col cols="11"  md="3">
                            <p>
                                All rights reserved.
                            </p>
                        </v-col>
                        <v-col cols="11"  md="2">
                            <p>
                                 AGA-0140-1
                            </p>
                        </v-col>
                        <v-col cols="11"  md="2">
                            <p>
                                 APRIL 2024
                            </p>
                        </v-col>
                    </v-row>
            </v-row>
            <!-- <v-row v-if="footerInfoLinkLocation === 'bottom'" class="footer-top" justify="center">
                <v-col cols="12" md="6" class="text-center">
                    <a href="#" target="_blank">Privacy Policy</a>
                    |
                    <a href="#" target="_blank">Important Safety Information</a>
                    |
                    <a href="#" target="_blank">Terms & Conditions</a>
                </v-col>
            </v-row> -->
        </v-content>
        </v-container>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import LayoutModule from '~/store/layout';

@Component<Footer>({})
export default class Footer extends Vue {
    @Resolve
    public layout!: LayoutModule;
    @Prop()
    public brkPoints!: object;
    @Prop({ default: false })
    public isFixed!: boolean;

    // mounted() {
    //     this.layout.replaceProgramName(this.layout.configuration.programName, this.layout.previousProgramName);
    // }

    // @Watch('layout.configuration.programName', { deep: true })
    // public watchProgramName(programName: string) {
    //     this.layout.replaceProgramName(programName, this.layout.previousProgramName);
    // }

    public get footerInfoLinkLocation() {
        return this.layout.configuration.footerInfoLinkLocation;
    }

    public get isTopOrBottomBar() {
        return ['top', 'bottom'].includes(this.footerInfoLinkLocation);
    }

    public get isLeftOrRightBar() {
        return ['left', 'right'].includes(this.footerInfoLinkLocation);
    }

    public get footerLogoSrc() {
        return this.layout.configuration.images.footer || this.$settings.url(this.$settings.footerLogo);
    }
}
</script>

<style lang="scss" scoped>
.drawer-pad {
    padding: 0px 0px 0px 350px !important;
    transition: padding 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.footer-container {
    padding: 0 !important;
}
.footer-top {
    background-color: #fff;
}

.small-shadow {
    -webkit-box-shadow: 0px 3px 10px rgba(50, 50, 50, 0.75);
    -moz-box-shadow: 0px 3px 10px rgba(50, 50, 50, 0.75);
    box-shadow: 0px 3px 10px rgba(50, 50, 50, 0.75);
}
.footer-bottom {
    background-color: #fff;
}
.v-application p {
    margin-bottom: 0;
}

.footer-logo {
    height: 60px;
}
.footer-info-links li {
    list-style: none;
    margin: 0 5px;
}
.inner-footer {
    transition: padding 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
