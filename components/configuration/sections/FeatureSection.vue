<template>
    <v-expansion-panel ref="drawer_features_panel">
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Features
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <p>Landing Page Features</p>
            <v-checkbox v-model="isHaveACard" label="Have A Card Feature" />
            <v-checkbox v-model="isReimbursement" label="Document Upload Feature" />

            <p>Patient Information Features</p>
            <v-checkbox
                ref="drawer_features_marketingOptIn"
                v-model="isMarketingOptIn"
                label="Marketing Opt-in Feature"
                @change="handleIsMarketingOptInSelection"
            />
            <v-checkbox ref="drawer_features_conditionalFields" v-model="hasConditionalFields" label="Conditional Fields Feature" />
            <v-checkbox v-model="hasDatePicker" label="Date Picker Feature" />
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

@Component<FeatureSection>({
    layout: 'default',
})
export default class FeatureSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    get isHaveACard() {
        return this.layout.configuration.isHaveACard;
    }

    set isHaveACard(isHaveACard) {
        this.layout.setConfiguration({ isHaveACard });
    }

    get isReimbursement() {
        return this.layout.configuration.isReimbursement;
    }

    set isReimbursement(isReimbursement) {
        this.layout.setConfiguration({ isReimbursement });
    }

    get isMarketingOptIn() {
        return this.layout.configuration.isMarketingOptIn;
    }

    set isMarketingOptIn(isMarketingOptIn) {
        this.layout.setConfiguration({ isMarketingOptIn });
    }

    get hasConditionalFields() {
        return this.layout.configuration.hasConditionalFields;
    }

    set hasConditionalFields(hasConditionalFields) {
        this.layout.setConfiguration({ hasConditionalFields });
    }

    get hasDatePicker() {
        return this.layout.configuration.hasDatePicker;
    }

    set hasDatePicker(hasDatePicker) {
        this.layout.setConfiguration({ hasDatePicker });
    }
}
</script>
