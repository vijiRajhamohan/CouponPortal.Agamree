<template>
    <v-container id="HomePage" fill-height>
        <CenterAlignment />
    </v-container>
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.spacer {
    height: 80px;
}
.big-btn {
    width: 100%;
    font-weight: bold;
    font-size: 1.5rem;
    text-decoration: none;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import LayoutModule from '~/store/layout';
import DocumentModule from '~/store/document';
import { Title } from '~/decorators/Title';
import { CenterAlignment, LeftAlignment, RightAlignment } from '~/components/PageComponents/LandingPageAlignments';
import { CommonTools } from '~/components/tools/commonTools';
import EnrollmentModule from '~/store/enrollment';
import EligibilityModule from '~/store/eligibility';

@Component<Index>({
    layout: 'default',
    components: {
        CenterAlignment,
        LeftAlignment,
        RightAlignment,
    },
})
@Title(process.env.NAME!)
export default class Index extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Resolve
    public document!: DocumentModule;

    @Resolve
    public enrollment!: EnrollmentModule;

    @Resolve
    public eligibility!: EligibilityModule;

    async created() {
        const [header, footer, cardArt] = await Promise.all([
            this.document.convertURLToDataUrl(this.$settings.headerLogo),
            this.document.convertURLToDataUrl(this.$settings.footerLogo),
            this.document.convertURLToDataUrl(this.$settings.card)
        ])
        const config = {
            ...this.layout.configuration,
            images: {
                header,
                footer,
                cardArt
            }
        }
        this.layout.setConfiguration(config);
        await this.layout.saveConfigurationToStorage('default');
        this.enrollment.clearStore();
        this.eligibility.clearStore();
    }

    public get nextPage(){
        return CommonTools.getRouteName('index', this.layout.configuration.pages);
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
