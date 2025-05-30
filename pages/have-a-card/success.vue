<template>
    <SuccessComponent />
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.card {
    // max-height: 250px;
    max-width: 100%;
    margin: 0 auto;
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import LayoutModule from '../../store/layout';
import SuccessComponent from '~/components/PageComponents/SuccessComponent.vue';

@Component<Success>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
    components: {
        SuccessComponent,
    },
})
export default class Success extends Vue {}
</script>
