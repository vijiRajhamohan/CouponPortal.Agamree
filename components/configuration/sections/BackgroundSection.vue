<template>
    <form-context :validator="$v">
        <v-expansion-panel>
            <v-expansion-panel-header class="pt-0 pb-0">
                <v-card-text class="pl-0">
                    <fa-icon size="1x" :icon="icon" class="header-icon" />
                    Background Options
                </v-card-text>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <ColorPicker label="Main Background Color" name="mainBackground" />
                <ColorPicker label="Header Background Color" name="headerBackground" />
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
import { Prop } from 'vue-property-decorator';
import { Title } from '~/decorators/Title';
import ColorPicker from '~/components/configuration/ColorPicker.vue'

@Component<BackgroundSection>({
    layout: 'default',
    components: {
        ColorPicker,
    },
})
export default class BackgroundSection extends Vue {
    @Prop()
    public icon: any;
}
</script>
