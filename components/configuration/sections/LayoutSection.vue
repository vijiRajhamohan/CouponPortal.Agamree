<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Layout Options
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-checkbox
                v-model="isProgressTracker"
                label="Progress Tracker"
                :disabled="!checkForDefaultPages(layout.configuration.pages)"
            />
            <p>Landing Page Alignment</p>
            <v-radio-group v-model="landingPageAlignment">
                <v-radio label="Left Aligned" color="primary" :value="'left'" class="pb-2"></v-radio>
                <v-radio label="Center Aligned" color="primary" :value="'center'" class="pb-2"></v-radio>
                <v-radio label="Right Aligned" color="primary" :value="'right'" class="pb-2"></v-radio>
            </v-radio-group>
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
import { Prop, Watch } from 'vue-property-decorator';
import LayoutModule from '~/store/layout';

@Component<LayoutSection>({
    layout: 'default',
})
export default class LayoutSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    @Watch('layout.configuration.pages', { immediate: true, deep: true })
    watchPageOrder(pageOrder: string[]) {
        const isDefaultPageOrder = this.checkForDefaultPages(pageOrder);
        // progress tracker is incompatible with a non standard page flow.  If the page order has been modified,
        // remove the progress tracker and send the user back to the homepage
        if (this.isProgressTracker && !isDefaultPageOrder) {
            this.isProgressTracker = false;
            this.$router.push({ name: 'index'})
        }
    }

    get isProgressTracker() {
        return this.layout.configuration.isProgressTracker;
    }

    set isProgressTracker(isProgressTracker) {
        const isDefaultPageOrder = this.checkForDefaultPages(this.layout.configuration.pages);
        if (!isDefaultPageOrder && isProgressTracker) {
            this.layout.setConfiguration({ isProgressTracker: false });
            return;
        }
        this.layout.setConfiguration({isProgressTracker});
    }

    get landingPageAlignment() {
        return this.layout.configuration.landingPageAlignment;
    }

    set landingPageAlignment(landingPageAlignment) {
        this.layout.setConfiguration({landingPageAlignment});
    }

    checkForDefaultPages(pageOrder: string[]) {
        const pages = [ ...this.layout.defaultConfiguration.pages ];
        return pageOrder.toString() === pages.toString();
    }
}
</script>
