<template>
    <v-container text-center>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6" xl="6">
                <v-card class="pa-4">
                    <h1 class="brand-header">Thank you for your request</h1>
                    <p>
                        Unfortunately, you are
                        <strong data-test="message_strong_rejection">not eligible</strong>
                        to participate in this program. There may be other financial assistance programs available to you. If you need more
                        information or want to discuss eligibility, please contact
                        <span v-text="$settings.name"></span>
                        at
                        <a :href="`tel:${$settings.phone}`">{{ $settings.phone }}</a>
                        8AM - 8PM, Monday through Friday.
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
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

@Component<Rejection>({})
export default class Rejection extends Vue {}
</script>
