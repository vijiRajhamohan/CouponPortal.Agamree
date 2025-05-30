<template>
    <v-container id="errorPage" fill-height text-center>
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6" xl="6">
                <v-card class="pa-4">
                    <h1 class="brand-header">We're Sorry</h1>
                    <p>
                        We’re having trouble processing your request.
                    </p>
                    <p>
                        Please contact
                        <span v-text="$settings.name_TM"></span>
                        Patient Services for assistance
                    </p>
                    <p>
                        <!-- <a :href="`tel:1-${$settings.phone_helpDesk}`">{{ $settings.phone_helpDesk }}</a> -->
                        at 1-866-653-1915 between 8AM - 8PM ET, Monday through Friday.
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component<Error>({})
export default class Error extends Vue {}
</script>

<style scoped></style>
