<template>
    <form-context :validator="$v">
        <v-expansion-panel>
            <v-expansion-panel-header class="pt-0 pb-0">
                <v-card-text class="pl-0">
                    <fa-icon size="1x" :icon="icon" class="header-icon" />
                    Color Options
                </v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <ColorPicker label="Primary Color" name="primary" />
                <ColorPicker label="Secondary Color" name="secondary" />
                <ColorPicker label="Secondary Bright Color" name="secondaryBright" />
                <ColorPicker label="Accent Color" name="accent" />
                <ColorPicker label="Neutral Light Color" name="neutralLight" />
                <ColorPicker label="Neutral Bright Color" name="neutralBright" />
                <ColorPicker label="Success Color" name="success" />
                <ColorPicker label="Brand Gray Color" name="brandGrey" />
                <ColorPicker label="Active Color" name="active" />
            </v-expansion-panel-content>
        </v-expansion-panel>
    </form-context>
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
import { Title } from '~/decorators/Title';
import ColorPicker from '~/components/configuration/ColorPicker.vue'

@Component<ColorSelection>({
    layout: 'default',
    components: {
        ColorPicker,
    },
})
export default class ColorSelection extends Vue {
    @Prop()
    public icon: any;
}
</script>
