<template>
    <v-footer min-height="120px" color="brandGrey" class="font-weight-medium pa-0">
        <v-content class="footer-container pt-0">
            <v-row class="footer-top" justify="center">
                <v-col cols="12" md="6" class="text-center">
                    <a data-test="footer_pi-link" href="#" target="_blank">Prescribing Information</a>
                    |
                    <a data-test="link_footer_privacy" href="#" target="_blank">Privacy Policy</a>
                    |
                    <a data-test="link_footer_terms" href="#" target="_blank">Terms & Conditions</a>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-row justify="center">
                        <v-col cols="auto">
                            <p class="trademark-text text-center">
                                CIZPLAM and associated logos are trademarks of TrialCard Inc.
                            </p>
                            <p class="trademark-text text-center">
                                © 2021 TrialCard Corporation.
                            </p>
                            <p class="trademark-text text-center">
                                01/2021 XX-XXX-XX-XXXXX
                            </p>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-content>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import LayoutModule from '~/store/layout';

@Component<ScrollingFooter>({})
export default class ScrollingFooter extends Vue {
    @Resolve
    public layout!: LayoutModule;
    // mounted() {
    //     this.layout.replaceProgramName(this.layout.configuration.programName, this.layout.previousProgramName)
    // }

    // @Watch('layout.configuration.programName', {deep: true})
    // public watchProgramName(programName: string) {
    //     this.layout.replaceProgramName(programName, this.layout.previousProgramName)
    // }
}
</script>

<style lang="scss" scoped>
.footer-bottom {
    background-color: var(--color-neutralBright);
}
.footer-top {
    background-color: var(--color-neutralLight);
}
.v-application p {
    margin-bottom: 0;
}

.footer-logo {
    height: 60px;
}
.footer-info-links li {
    display: inline;
    margin: 0 5px;
}

footer.v-footer.footer-clearfix {
    height: unset !important;
    padding: 0;
}

.theme--light.v-footer {
    background: transparent;
}

.footer-text {
    background-color: var(--color-neutralLight);
    color: var(--color-brandGrey);
}
</style>
