<template>
    <v-row :justify="'center'">
        <v-col cols="12" md="10" lg="8" xl="6">
            <div v-if="layout.configuration.isProgressTracker">
                <EligibilityComponent />
            </div>
            <v-card v-else tile class="pb-4 px-8">
                <EligibilityComponent />
            </v-card>
        </v-col>
    </v-row>
</template>

<style lang="scss" scoped>
.eligibility-btn {
    height: 150px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Resolve } from 'vue-di';
import EligibilityComponent from '~/components/PageComponents/EligibilityComponent.vue';
import LayoutModule from '~/store/layout';

@Component<EligibilityPage>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
    components: {
        EligibilityComponent,
    },
})
export default class EligibilityPage extends Vue {
    @Resolve
    public layout!: LayoutModule;
}
</script>
