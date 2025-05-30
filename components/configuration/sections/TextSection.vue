<template>
    <v-expansion-panel>
        <v-expansion-panel-header class="pt-0 pb-0">
            <v-card-text class="pl-0">
                <fa-icon size="1x" :icon="icon" class="header-icon" />
                Text Options
            </v-card-text>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <form-field v-slot="{ attrs, events }" name="setValues.secondary" label="secondary color">
                <v-text-field
                    v-model="drugName"
                    dark
                    label="Drug Name"
                    v-bind="attrs"
                    :maxLength="25"
                    v-on="events"
                    @keypress.enter="handleDrugName">
                    <template v-slot:append>
                        <v-btn
                            depressed
                            tile
                            class="ma-0"
                            @click="handleDrugName">
                            Submit
                        </v-btn>
                    </template>
                </v-text-field>
            </form-field>
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
import { maxLength } from 'vuelidate/lib/validators';
import LayoutModule from '~/store/layout';
import { Validate } from '~/validation/Validate';

@Component<TextSection>({
    layout: 'default',
})
export default class TextSection extends Vue {
    @Resolve
    public layout!: LayoutModule;

    @Prop()
    public icon!: any;

    @Validate({maxLength: maxLength(25)})
    drugName = '';

    handleDrugName() {
        this.layout.setConfiguration({ programName: this.drugName})
        this.drugName = '';
    }
}
</script>
