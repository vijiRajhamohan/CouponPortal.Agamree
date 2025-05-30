<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="10" lg="8" xl="6">
                <v-card class="pa-4 mt-4">
                    <v-row justify="center">
                        <v-col cols="12">
                            <div class="center-container">
                                <h1 class="brand-header" data-test="message_h1">Thank you!</h1>
                            </div>
                            <p class="instructions">Please see below for processing information.</p>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" md="8" class="text-center">
                            <!-- <img id="cardArt-logo" :src="cardArtLogoSrc" class="card" data-test="card_img" /> -->
                            <p>
                                <strong>Bin: </strong>
                                <span data-test="bin">610852</span>
                            </p>
                            <p>
                                <strong>Group: </strong>
                                <span data-test="group">77770204</span>
                            </p>
                            <p>
                                <strong>PCN: </strong>
                                <span data-test="pcn">2001</span>
                            </p>
                            <p>
                                <strong>ID: </strong>
                                <span data-test="id">{{ memberNumber }}</span>
                            </p>

                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="12" md="10" lg="8" xl="6" class="pa-6">
                            <v-btn
                                ref="btn_home"
                                class="big-btn fs-24"
                                height="60"
                                :outlined="layout.configuration.isOutlined"
                                :rounded="layout.configuration.isRounded"
                                color="primary"
                                :to="{ name: 'index' }"
                            >
                                Home
                            </v-btn>
                        </v-col>
                        <!-- <p v-if="pdfError" class="error-text">There has been an error with your request. Please try again later</p> -->
                    </v-row>
                </v-card>
                <!-- <v-card v-if="layout.configuration.isReimbursement" class="pa-4 mt-4 bg-secondary">
                    <h2 class="cta font-weight-bold text-center white--text">Have documents to upload?</h2>
                    <v-row justify="center">
                        <v-col cols="12" md="10" lg="8" xl="6" class="pa-6">
                            <v-btn
                                ref="btn-reimbursement"
                                justify="center"
                                class="big-btn upload-documents-btn fs-24"
                                color="primary"
                                height="60"
                                :outlined="layout.configuration.isOutlined"
                                :rounded="layout.configuration.isRounded"
                                :to="{ name: 'upload-documents' }"
                            >
                                Upload Documents
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card> -->
            </v-col>
        </v-row>
    </v-container>
</template>

<style lang="scss"></style>

<style lang="scss" scoped>
.bg-secondary {
    background-color: var(--color-secondary)
}
.center-container {
    text-align: center;
}
.card {
    // max-height: 250px;
    max-width: 100%;
    margin: 0 auto;
}
</style>

<script lang="ts">
import moment from 'moment';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import { AxiosResponse } from 'axios';
import LayoutModule from '~/store/layout';
import DocumentModule from '~/store/document';
import EnrollmentModule from '~/store/enrollment';

@Component<SuccessComponent>({
    layout({ store }) {
        return store.state.layout.configuration.isProgressTracker ? 'step' : 'default';
    },
})
export default class SuccessComponent extends Vue {
    @Resolve
    public layout!: LayoutModule;

    /* @Resolve
    public document!: DocumentModule; */

    @Resolve
    public enrollment!: EnrollmentModule;

    /* public get cardArtLogoSrc() {
        return this.layout.configuration.images.cardArt || this.$settings.url(this.$settings.card);
    } */

    /* public expirationDate = moment.isMoment(this.enrollment.expirationDate) ? this.enrollment.expirationDate.format('L') : this.enrollment.expirationDate; */

    public memberNumber = this.enrollment.memberNumber;

    public pdfError = false;

    /* async handleDownload() {
        this.$wait.start('nuxt');
        const response: AxiosResponse = await this.document.fetchDocument();
        if (response.data) {
            const sampleArr = await this.document.base64ToArrayBuffer(response.data);
            await this.document.saveByteArray('copay-card', sampleArr);
        } else {
            this.pdfError = true;
        }
        this.$wait.end('nuxt');
    } */
}
</script>
