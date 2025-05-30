<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Footer Options
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <p>Footer Type</p>
            <v-radio-group id="radio-caregiver" v-model="footerType">
                <v-radio label="Static Footer" color="primary" :value="'static'" class="pb-2"></v-radio>
                <v-radio label="Scrolling Footer" color="primary" :value="'scrolling'" class="pb-2"></v-radio>
                <v-radio label="Floating Footer" color="primary" :value="'floating'" class="pb-2"></v-radio>
            </v-radio-group>
            <p>Footer Info Link Locations</p>
            <v-radio-group id="radio-caregiver" v-model="footerInfoLinkLocation">
                <v-radio label="Top" color="primary" :value="'top'" class="pb-2"></v-radio>
                <v-radio label="Bottom" color="primary" :value="'bottom'" class="pb-2"></v-radio>
                <v-radio label="Right" color="primary" :value="'right'" class="pb-2"></v-radio>
                <v-radio label="Left" color="primary" :value="'left'" class="pb-2"></v-radio>
            </v-radio-group>
            <v-checkbox v-model="showFooterLogo" label="Show Footer Logo" />
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<style lang="scss" scoped>
@import '~/assets/style/variables.scss';
</style>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import { Prop } from 'vue-property-decorator';
import LayoutModule from '~/store/layout';

@Component<FooterSection>({
    layout: 'default',
})
export default class FooterSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    get footerType() {
        return this.layout.configuration.footerType;
    }

    set footerType(footerType) {
        this.layout.setConfiguration({footerType});
    }

    get showFooterLogo() {
        return this.layout.configuration.showFooterLogo;
    }

    set showFooterLogo(showFooterLogo) {
        this.layout.setConfiguration({showFooterLogo});
    }

    get footerInfoLinkLocation() {
        return this.layout.configuration.footerInfoLinkLocation;
    }

    set footerInfoLinkLocation(footerInfoLinkLocation) {
        this.layout.setConfiguration({footerInfoLinkLocation});
    }
}
</script>
