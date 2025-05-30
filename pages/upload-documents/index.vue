<template>
    <v-container>
        <v-row :justify="'center'">
            <v-col cols="12" lg="8">
                <DocumentUpload />
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import DocumentUpload from '~/components/DocumentUpload/DocumentUpload.vue';

@Component<Reimbursement>({
    components: {
        DocumentUpload,
    },
})
export default class Reimbursement extends Vue {}
</script>
