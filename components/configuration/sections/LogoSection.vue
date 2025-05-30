<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Logo Upload
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <ImageFileInput name="header" label="Header Logo"/>
            <ImageFileInput name="footer" label="Footer Logo"/>
            <ImageFileInput name="cardArt" label="Card Art Logo"/>
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
import { Prop } from 'vue-property-decorator';
import ImageFileInput from '~/components/configuration/ImageFileInput.vue';

@Component<LogoSection>({
    layout: 'default',
    components: {
        ImageFileInput,
    }
})
export default class LogoSection extends Vue {

    @Prop()
    public icon: any;
}
</script>
