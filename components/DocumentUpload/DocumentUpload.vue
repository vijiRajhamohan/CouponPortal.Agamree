<template>
    <div id="document-upload">
        <v-row v-if="!success">
            <v-col cols="12">
                <h3 class="text-center">
                    Please upload at least one document.
                </h3>
                <p class="text-center">
                    <strong>Valid file type:</strong>
                    PDF
                </p>
                <form-context :validator="$v" :attributes="{ files: 'Files' }">
                    <form-field v-slot="{ attrs, events }" name="files" label="Files">
                        <DocumentList v-bind="attrs" v-on="events" />
                    </form-field>
                </form-context>
            </v-col>
            <v-col cols="12">
                <v-alert
                    v-if="$v.$anyError && files.length === 0"
                    ref="message_error_required"
                    class="text-center"
                    type="error"
                    outlined
                    icon="$vuetify.icons.error"
                    transition="scale-transition"
                >
                    You must upload at least one document.
                </v-alert>
                <v-alert
                    v-if="uploadModule.isInvalidTypeError"
                    ref="message_error_invalid-file-type"
                    type="error"
                    outlined
                    icon="$vuetify.icons.error"
                    transition="scale-transition"
                >
                    One or more files could not be uploaded due to an invalid file type. Please select files that match the valid type(s)
                    listed above.
                </v-alert>
                <v-alert
                    v-if="uploadModule.isInvalidSizeError"
                    ref="message_error_invalid-file-size"
                    type="error"
                    outlined
                    icon="$vuetify.icons.error"
                    transition="scale-transition"
                >
                    One or more files could not be uploaded due to size limitations. The total size of all uploads must be 10MB or less.
                </v-alert>
            </v-col>
            <v-col cols="12">
                <NextBack :back-function="handleBack" :next-function="submit" :btnNames="['Submit', 'Back']" />
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <v-alert
                    v-if="success"
                    ref="message_success-submit"
                    type="success"
                    outlined
                    icon="$vuetify.icons.success"
                    transition="scale-transition"
                >
                    Your {{ files.length > 1 ? 'documents have' : 'document has' }} been successfully submitted.
                </v-alert>
            </v-col>
            <v-col cols="12" class="text-center">
                <v-btn
                    ref="btn_upload-more"
                    x-large
                    color="primary"
                    :outlined="layout.configuration.isOutlined"
                    :rounded="layout.configuration.isRounded"
                    @click="restart()"
                >
                    Upload More Documents

                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<style lang="scss"></style>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Resolve } from 'vue-di';
import { required } from 'vuelidate/lib/validators';
import NextBack from '~/components/NextBack.vue';
import DocumentList from '~/components/DocumentUpload/DocumentList.vue';
import { createPdfForUpload } from '~/services/documentUpload';
import DocumentUploadModule from '~/store/documentUpload';
import { Validate } from '~/validation/Validate';
import LayoutModule from '~/store/layout';

@Component<DocumentUpload>({
    components: {
        NextBack,
        DocumentList,
    },
})
export default class DocumentUpload extends Vue {
    @Resolve
    uploadModule!: DocumentUploadModule;
    @Resolve
    layout!: LayoutModule;

    @Validate({ required })
    files: VUFile[] = [];

    public documentUploaded = false;
    public success = false;

    @Watch('uploadModule.files', { immediate: true })
    public async watchFiles(files: VUFile[]) {
        if (files.length > 0) {
            this.documentUploaded = true;
            this.files = files;
        }
    }

    public doValidate() {
        this.$v.$touch();

        if (this.isInvalid) {
            return false;
        }
        return true;
    }
    public get isInvalid() {
        return (this.$v.$invalid || !this.documentUploaded) && this.$v.$dirty;
    }

    handleBack() {
        this.uploadModule.clearStore();
        this.$router.push({ name: 'index' });
    }

    restart() {
        this.uploadModule.clearStore();
        this.files = [];
        this.$v.$reset();
        this.success = false;
    }

    async submit() {
        if (!this.doValidate() || this.success) {
            return;
        }
        this.$wait.start('nuxt');
        try {
            const mergedPdf = await createPdfForUpload(this.files);
            this.success = await this.uploadModule.uploadDocument({ file: mergedPdf, documentTypeId: null });
        } catch (error) {
            this.success = false;
        }
        this.$wait.end('nuxt');
        if (!this.success) {
            this.$router.push({ name: 'error' });
        }
    }
}
</script>
