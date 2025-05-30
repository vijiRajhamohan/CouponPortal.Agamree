<template>
    <DefaultError :details="{ statusCode, message, title: message, icon: ['far', 'cloud'] }" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DefaultError from '~/components/DefaultError.vue';

@Component<ErrorPage>({
    components: { DefaultError },
    head() {
        return {
            title: this.message,
        };
    },
})
export default class ErrorPage extends Vue {
    @Prop({ type: Object, default: null })
    public error!: any;

    public get statusCode() {
        return (this.error && this.error.statusCode) || 500;
    }

    public get message() {
        return this.error.message || 'unknown';
    }
}
</script>
