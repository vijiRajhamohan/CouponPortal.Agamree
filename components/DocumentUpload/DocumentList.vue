<template>
    <div class="outer-table" @drop="clearValidationErrors()">
        <!-- Initial Upload -->
        <div v-if="!files.length" class="text-center">
            <div class="cell nothing-found">
                <div class="p-5">
                    <div class="mt-4">
                        <label :for="name">
                            <UploadIcon />
                        </label>
                    </div>

                    <h4 class="text-center">
                        <label :for="name">
                            Drop file to upload
                            <br />
                            or
                        </label>
                        <v-flex text-center>
                            <label class="fake-btn clickable" data-test="btn_add-file" :for="name" @click="clearValidationErrors()">
                                Click Here
                            </label>
                        </v-flex>
                    </h4>
                </div>
            </div>
        </div>
        <!-- Uploaded Files -->
        <div v-else>
            <div
                v-for="(file, index) in files"
                :key="file.id"
                :class="{ 'file-row': true, 'file-success': file.success, 'file-error': file.error }"
                transition="fade"
                mode="out-in"
            >
                <div class="table-at-lg">
                    <div class="flex-row file">
                        <div text-no-wrap class="filename text-truncate cell">
                            <b class="small-label">Name</b>
                            {{ file.name }}
                            <br />
                            {{ `${fileSizeForDisplay(file.size)}` }}
                        </div>
                        <div v-if="!file.active && !file.success && !disabled" class="cell text-sm-right action-section">
                            <label class="has-tool-tip">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            :ref="'remove' + index"
                                            fab
                                            small
                                            dark
                                            color="#004c6c"
                                            class="mx-1"
                                            data-test="btn_remove-file"
                                            @click.prevent="removeFile(file)"
                                        >
                                            <fa-icon class="btn-ico" color="#004c6c" :icon="$icons.faTrashAlt" size="1x" v-on="on" />
                                        </v-btn>
                                    </template>
                                    <span>
                                        Remove
                                    </span>
                                </v-tooltip>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Add File -->
            <div v-if="!disabled" class="text-center mt-7">
                <p>
                    Total Upload Size:
                    {{ `${fileSizeForDisplay(uploadModule.totalUploadSize)}/${fileSizeForDisplay(uploadModule.maxFileSize)}` }}
                </p>
                <label class="fake-btn clickable" data-test="btn_add-file" :for="name" @click="clearValidationErrors()">Add New File</label>
            </div>
        </div>
        <!-- File Input (hidden from view) -->
        <FileUpload
            ref="input_upload"
            :accept="accept"
            :v-model="files"
            :extensions="extensions"
            :multiple="multiple"
            :directory="directory"
            :thread="thread"
            :name="name"
            :drop="drop"
            :drop-directory="dropDirectory"
            :add-index="addIndex"
            :disabled="disabled"
            @input-filter="inputFilter"
            @input="inputChange"
            @input-file="inputFile"
        />
    </div>
</template>

<style lang="scss" scoped>
$primary: #004c6c;
$secondary: #980539;
$neutral: #d9d9d9;
$success: #009955;

.text-success {
    color: $success;
}
.text-error {
    color: $secondary;
}
.status-section {
    width: auto;
    padding-right: 0.25em;
    @media only all and (min-width: 950px) {
        width: 100%;
        text-align: center;
    }
}
.text-status {
    font-size: 0.9rem;
    font-weight: 700;
}

.filename {
    @media only all and (min-width: 950px) {
        max-width: 20em;
        min-width: 10em;
    }
    padding: 0.5rem 1em;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
}
.file-row {
    position: relative;
    padding: 0.5rem 0;
    border-bottom: solid #adadad 1px;
}
.file-success {
    background-color: #e8fcf3;
    transition-duration: 0.5s;
}
.file-error {
    background-color: #ffe8f0;
    transition-duration: 0.5s;
}
.fake-btn {
    text-transform: uppercase;
    color: $primary;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}
.clickable {
    cursor: pointer;
}
.outer-table {
    border: dashed #004c6c 1px;
    &.active {
        background-color: #fdfdfd;
    }
    border-radius: 0.25rem;
    padding: 0.5rem;
}
.table-at-lg {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media only all and (max-width: 950px) {
        display: flex;
    }
}
.file-row {
    @media only all and (max-width: 950px) {
        padding: 0.5rem;
        display: block;
        width: 100%;

        position: relative;
    }
}
.flex-row {
    display: flex;
    flex-direction: row;
    text-align: left;
    width: 100%;
    .cell {
        // display: table-cell;
        flex-grow: 1;
        flex-grow: 1;
        .small-label {
            display: none;
            padding-bottom: 0.25em;
        }
    }
    .action-section {
        min-width: 120px;
        width: 120px;
    }

    @media only all and (max-width: 800px) {
        flex-flow: row wrap;

        .cell {
            min-width: 50%;
            box-sizing: border-box;
            flex-grow: 0;
            flex-grow: 0;
            .small-label {
                display: block;
                width: 100%;
            }
        }

        .cell.action-section,
        .cell.status-section {
            text-align: center;
            white-space: nowrap;
        }
    }
}
.file-row {
    @media only all and (max-width: 500px) {
        flex-direction: column;
        &:not(.file-success) .cell {
            &.filename {
                padding: 0;
            }
            padding-top: 1.5em;
            min-width: 100%;
        }
        .status-section {
            width: 100% !important;
            text-align: center;
        }
    }
}
.progress-wrapper {
    padding-bottom: 0.5rem;
    .progress {
        width: 100%;
        height: 0.25rem;
        display: block;
        position: absolute;
        background-color: $neutral;
        .loader {
            height: 100%;
            display: block;
        }
        .good-loader {
            background-color: $primary;
        }
        .bad-loader {
            background-color: $secondary !important;
        }
        .smooth {
            transition-duration: 0.75s;
            transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
        }
    }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import FileUpload from 'vue-upload-component';
import { faFileUpload, faEllipsisH, faExclamationCircle, faCheckCircle, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { Resolve } from 'vue-di';
import UploadIcon from './UploadIcon.vue';
import DocumentUploadModule from '~/store/documentUpload';

@Component<DocumentList>({
    components: {
        UploadIcon,
        FileUpload,
    },
    icons: {
        faFileUpload,
        faEllipsisH,
        faCheckCircle,
        faTrashAlt,
        faExclamationCircle,
    },
})
export default class DocumentList extends Vue {
    @Resolve
    uploadModule!: DocumentUploadModule;

    // FileUpload Props
    public files: VUFile[] = [];
    public multiple = true;
    public directory = false;
    public extensions = 'pdf';
    public thread = 3;
    public name = 'file';
    public drop = true;
    public dropDirectory = true;
    public addIndex = false;
    public disabled = false;

    get accept() {
        return this.uploadModule.validFileTypes.join(',');
    }

    fileSizeForDisplay(size: number) {
        const mb = 1000000;
        if (size < mb) {
            return `${(size / mb).toFixed(2)}MB`;
        }
        return `${Math.round(size / mb)}MB`;
    }

    // restore files from upload store if needed
    created() {
        this.files = this.uploadModule.files;
    }

    clearValidationErrors() {
        // clear error messages
        this.uploadModule.setIsInvalidSizeError(false);
        this.uploadModule.setIsInvalidTypeError(false);
    }
    // before v-model change of FileUpload
    async inputFilter(newFile: VUFile, oldFile: VUFile, prevent: () => void) {
        // validate each upload
        this.uploadModule.validateUpload(newFile);
        const { isInvalidSize, isInvalidType } = this.uploadModule.uploadValidation;

        // determine whether to show error messages
        if (isInvalidSize) {
            this.uploadModule.setIsInvalidSizeError(true);
        }
        if (isInvalidType) {
            this.uploadModule.setIsInvalidTypeError(true);
        }

        // block invalid file from being uploaded
        if (isInvalidSize || isInvalidType) {
            return prevent();
        }
    }

    // on v-model change of FileUpload
    inputChange(files: VUFile[]) {
        // clear pending uploads and validations
        this.uploadModule.clearPendingUploads();
        this.uploadModule.resetUploadValidation();
    }

    // after v-model change of FileUpload
    inputFile(newFile: VUFile) {
        this.uploadModule.addFile(newFile);
    }

    removeFile(file: VUFile) {
        this.uploadModule.removeFile(file);
    }
}
</script>
