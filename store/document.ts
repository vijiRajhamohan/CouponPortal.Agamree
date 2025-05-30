import { Mutation, Action } from 'vuex-module-decorators';
import { InjectModule, InjectVuexModule } from 'vue-di/vuex';
import { Resolve } from 'vue-di';
import { EdgeDocumentsApi } from '@trialcard/apigateway.client/edgeDocumentsApi';
import EnrollmentModule from '~/store/enrollment';
import PatientModule from '~/store/patient';
import { Settings } from '~/services/settings';
const capitalize = (str: string) =>
    str
        .split(' ')
        .map(str =>
            str
                .charAt(0)
                .toUpperCase()
                .concat(str.slice(1))
        )
        .join(' ');
@InjectModule({ stateFactory: true }, module)
export default class DocumentModule extends InjectVuexModule {
    @Resolve
    enrollment!: EnrollmentModule;

    @Resolve
    edgeDocumentsApi!: EdgeDocumentsApi;

    @Resolve
    patient!: PatientModule;

    @Resolve
    settings!: Settings;

    public hasDocument = false;

    @Action({ rawError: true })
    clear() {
        this.updateDocumentStatus(false);
    }

    @Action({ rawError: true })
    setDocumentStatus(newDocumentStatus: boolean) {
        this.hasDocument = newDocumentStatus;
    }

    /**
     * To utilize this function, set "url" to the url where your download button will be.
     * Set the first argument in the "fileUrl" replace method to the entire path (in this case 'need-a-card/success')
     * Set the output name of the finished pdf as outputFileName.  In this case, it is "copay-card"
     * Prepare your form fields in the PDF utilizing Adobe, and take note of the field names you have chosen
     * Create objects in the "fileData" array for each form field, where the "name" is the name of the field on the pdf
     * The "value" is the data you wish to display in that field.
     * On the portico dashboard for this portal, add the "staticPortalFiles" array to the portal configuration
     * Add the file name as a string within the array.
     */
    @Action({ rawError: true })
    public async fetchDocument() {
        // Below included to allow testing from localhost.
        const url = window.location.href.includes('localhost')
            ? 'https://portal-qa.trialcard.com/cizplam/couponportal/need-a-card/success'
            : window.location.href;
        const document = await this.edgeDocumentsApi.fillablePdfGenerateFillablePdf({
            fileUrl: url.replace(/need-a-card\/success\/?/, 'CopayCardPDF.pdf'),
            outputFileName: 'copay-card',
            fileData: [{ name: 'memberNumber', value: this.enrollment.memberNumber || '' }],
        });
        return document;
    }

    base64ToArrayBuffer(data: string) {
        const input = data.substring(data.indexOf(',') + 1);
        const binaryString = window.atob(input);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    }

    saveByteArray(reportName: string, bytes: Uint8Array) {
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        const fileName = reportName;
        link.download = fileName;
        link.click();
    }

    public async convertImagetoBase64(url: string, callBack: Function) {
        const  xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';

        xhr.addEventListener('load', async function() {
            const  recoveredBlob = await xhr.response;

            const  reader = new FileReader;

            await reader.addEventListener('load', async function() {
                await callBack(reader.result);
            });

            await reader.readAsDataURL(recoveredBlob);
        });

        await xhr.open('GET', url);
        await xhr.send();
    }

    public async convertDataUrltoBlob(dataUrl: string) {
        // separate out the mime component
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0]
        const arrayBuffer = await this.base64ToArrayBuffer(dataUrl);

        // generate a new blob from the ArrayBuffer
        const blob = new Blob([arrayBuffer], {type: mimeString});
        return blob;
    }

    async convertURLToDataUrl(src: string) {
        const result = await fetch(this.settings.url(src))
            .then(response => response.blob())
            .catch(error => console.log(error)) ;

            const objectUrl = URL.createObjectURL(result);
            let dataUrl = '';
            await this.convertImagetoBase64(objectUrl,  async (result: string) => {
                dataUrl = await result
            })
            await new Promise(resolve => setTimeout(resolve, 500));
            return dataUrl;
    }

    @Mutation
    updateDocumentStatus(newDocumentStatus: boolean) {
        this.setDocumentStatus(newDocumentStatus);
    }
}
