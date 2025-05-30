import { EdgeDocumentsApi } from '@trialcard/apigateway.client';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Mutation, Action } from 'vuex-module-decorators';
import { Resolve } from 'vue-di';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Settings } from '~/services/settings';
interface IUploadValidation {
    isInvalidType: boolean | null;
    isInvalidSize: boolean | null;
}

@InjectModule({ stateFactory: true }, module)
export default class DocumentUploadModule extends InjectVuexModule {
    @Resolve
    public settings!: Settings;

    @Resolve
    documentApi!: EdgeDocumentsApi;

    public files: VUFile[] = [];
    public validFileTypes = ['application/pdf'];
    public maxFileSize = 10000000;
    public pendingUploadSize = 0;
    public totalUploadSize = 0;
    // validation state of incoming upload
    public uploadValidation: IUploadValidation = {
        isInvalidSize: null,
        isInvalidType: null,
    };
    // validation error messages
    public isInvalidSizeError = false;
    public isInvalidTypeError = false;

    @Mutation
    public validateUpload(data: VUFile) {
        const isInvalidSize = data.file.size + this.pendingUploadSize + this.totalUploadSize > this.maxFileSize;
        const isInvalidType = !this.validFileTypes.includes(data.file.type);
        if (!isInvalidSize) {
            this.pendingUploadSize += data.file.size;
        }
        this.uploadValidation = {
            isInvalidSize,
            isInvalidType,
        };
    }

    @Mutation
    setIsInvalidSizeError(value: boolean) {
        this.isInvalidSizeError = value;
    }

    @Mutation
    setIsInvalidTypeError(value: boolean) {
        this.isInvalidTypeError = value;
    }

    @Mutation
    public addFile(data: VUFile) {
        this.files.push(data);
        this.totalUploadSize += data.file.size;
    }

    @Mutation
    public removeFile(data: VUFile) {
        const index = this.files.findIndex(file => file.id === data.id);
        this.files.splice(index, 1);
        this.totalUploadSize -= data.file.size;
    }

    @Mutation
    public clearPendingUploads() {
        this.pendingUploadSize = 0;
    }

    @Mutation
    public resetUploadValidation() {
        this.uploadValidation = {
            isInvalidSize: null,
            isInvalidType: null,
        };
    }

    @Mutation
    public clearStore() {
        this.files = [];
        this.uploadValidation = {
            isInvalidSize: null,
            isInvalidType: null,
        };
        this.isInvalidSizeError = false;
        this.isInvalidTypeError = false;
        this.pendingUploadSize = 0;
        this.totalUploadSize = 0;
    }

    @Action({})
    async uploadDocument(request: { file: File; documentTypeId: string | null }) {
        try {
            const form = new FormData();
            if (request.documentTypeId) form.append('type', request.documentTypeId);
            form.append('attachment', request.file);
            const axios: AxiosInstance = (this.documentApi as any).axios;
            const axiosRequest: AxiosRequestConfig = {
                url: 'edge/documents/v1/Document/upload',
                method: 'POST',
                data: form,
                headers: {
                    'x-program-id': this.settings.programId!,
                },
            };
            await Promise.all([
                (this.documentApi as any).authentications.ApiKey.applyToRequest(axiosRequest),
                (this.documentApi as any).authentications.Bearer.applyToRequest(axiosRequest),
                (this.documentApi as any).authentications.Token.applyToRequest(axiosRequest),
            ]);
            const { data } = await axios.request(axiosRequest);
            return data.data && data.success;
        } catch {
            return false;
        }
    }
}
