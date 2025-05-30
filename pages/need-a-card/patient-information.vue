<template>
    <v-row :justify="'center'">
        <v-col cols="12" md="10" lg="8" xl="6">
            <div v-if="layout.configuration.isProgressTracker">
                <PatientInformationComponent />
            </div>
            <v-card v-else tile class="pb-4 px-8">
                <PatientInformationComponent />
            </v-card>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import LayoutModule from '~/store/layout';
import genders from '~/assets/genders';
import PatientInformationComponent from '~/components/PageComponents/PatientInformationComponent.vue';

@Component<PatientInformation>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
    components: {
        PatientInformationComponent,
    },
})
export default class PatientInformation extends Vue {
    @Resolve
    public layout!: LayoutModule;
}
</script>
