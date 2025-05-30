<template>
    <v-layout align-center justify-center fill-height class="mt-4">
        <v-flex xs12 sm6 md5 lg4>
            <v-card>
                <v-toolbar flat color="accent">
                    <v-toolbar-title>{{ statusCode }} {{ title }}</v-toolbar-title>
                    <v-spacer />

                    <fa-icon v-if="icon" :icon="icon" size="2x" />
                </v-toolbar>
                <v-card-text>
                    {{ message }}
                </v-card-text>
                <v-card-text v-if="statusCode === 404" class="description">
                    <NuxtLink class="error-link" to="/">Return Home</NuxtLink>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Title } from '~/decorators/Title';

@Component<DefaultError>({
    head() {
        return {
            title: `${this.statusCode} ${this.title}`,
        };
    },
})
export default class DefaultError extends Vue {
    @Prop({ type: [Number, String], required: false })
    public code!: string;

    @Prop({ type: Object, required: false })
    public details!: { icon: [string, string]; title: string; message: string; statusCode: number };

    public get statusCode() {
        return this.code || this.errorPage.statusCode;
    }

    public get errorPage() {
        return this.details || this.$settings.errorPages[this.code] || this.$settings.errorPages.default;
    }

    public get title() {
        return this.errorPage.title;
    }

    public get icon() {
        return this.errorPage.icon;
    }

    public get message() {
        return this.errorPage.message;
    }
}
</script>

<style lang="scss" scoped></style>
