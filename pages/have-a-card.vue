<template>
    <v-container fluid grid-list-lg>
        <nuxt-child />
    </v-container>
</template>

<style lang="scss"></style>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Title } from '~/decorators/Title';

@Component<HaveACard>({
    layout: 'default',
    icons: {},
})
@Title('Have a Card')
export default class HaveACard extends Vue {}
</script>
