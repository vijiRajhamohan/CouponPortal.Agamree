<template>
    <!-- prettier-ignore -->
    <span>{{ $settings.name }}<sup>&reg;</sup></span>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class DrugName extends Vue {}
</script>
