<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Button Options
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-checkbox v-model="isOutlined" label="Outlined" />
            <v-checkbox v-model="isRounded" label="Rounded" />
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

@Component<ButtonSection>({
    layout: 'default',
})
export default class ButtonSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon: any;

    get isOutlined() {
        return this.layout.configuration.isOutlined;
    }

    set isOutlined(isOutlined) {
        this.layout.setConfiguration({isOutlined});
    }

    get isRounded() {
        return this.layout.configuration.isRounded;
    }

    set isRounded(isRounded) {
        this.layout.setConfiguration({isRounded});
    }
}
</script>
