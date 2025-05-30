<template>
    <nuxt />
</template>
<style lang="scss" scoped>
</style>
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
@Component<LockLayout>({})
export default class LockLayout extends Vue {}
</script>
