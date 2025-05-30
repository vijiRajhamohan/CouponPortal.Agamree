<template>
    <div>
        <nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component<BlankLayout>({})
export default class BlankLayout extends Vue {}
</script>
