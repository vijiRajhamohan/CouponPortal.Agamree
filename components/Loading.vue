<template>
    <div style="display:none;"></div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import 'vue-wait';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { intersection } from 'lodash';

@Component({})
export default class Loading extends Vue {
    public types = ['nuxt', 'nuxt-child'];
    public from: Route | null = null;
    public to: Route | null = null;
    public created() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$router as any).beforeHooks.unshift((to: Route, from: Route, next: Function) => {
            this.to = to;
            this.from = from;
            // for (const type of this.types) {
            //     if (this.$wait.is(type)) this.$wait.end(type);
            // }
            // if (this.$wait.is('nuxt')) {
            //     this.$wait.end('nuxt');
            // }
            const type = this.getType();
            if (!type) return;
            this.$wait.start(type);
            next();
        });

        this.$router.afterEach((to, from) => {
            const type = this.getType();
            if (!type) return;
            if (this.$wait.is(type)) {
                this.$wait.end(type);
            }
        });
    }
    start() {
        // const type = this.getType();
        // if (!type) return;
        // this.$wait.start(type);
    }
    finish() {
        // const type = this.getType();
        // if (!type) return;
        // if (this.$wait.is(type)) {
        //     this.$wait.end(type);
        // }
    }
    fail() {
        const type = this.getType();
        if (!type) return;
        if (this.$wait.is(type)) {
            this.$wait.end(type);
        }
    }
    increase(num: number) {
        const type = this.getType();
        if (!type) return;
        if (this.$wait.is(type)) {
            this.$wait.progress(type, num, 100);
        }
    }
    private getType() {
        const { to, from } = this;
        if (!to || !from) return null;
        if (to.matched.length > 1) {
            const toNames = to.matched.slice(0, to.matched.length - 1).map(x => x.name);
            const fromNames = from.matched.slice(0, from.matched.length - 1).map(x => x.name);
            if (intersection(toNames, fromNames).length === toNames.length) {
                return 'nuxt-child';
            }
        }
        return 'nuxt';
    }
}
</script>
