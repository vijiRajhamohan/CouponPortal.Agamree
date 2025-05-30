/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { PDFDocument } from 'pdf-lib';
import { VUFile } from 'vue-upload-component';

export async function createPdfForUpload(files: VUFile[], name = `user_upload_${moment().format('MM-DD-YYYY')}.pdf`) {
    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
        const fileArrayBuffer = await createPdfArrayBuffer(file.file);
        const fileDoc = await PDFDocument.load(fileArrayBuffer);
        const filePages = await pdfDoc.copyPages(fileDoc, fileDoc.getPageIndices());
        filePages.forEach(page => {
            pdfDoc.addPage(page);
        });
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes]);
    return new File([blob], name);
}

async function createPdfArrayBuffer(file: File) {
    const fileType = file.type;
    const blob = URL.createObjectURL(file);
    let pdfFile: Uint8Array;
    if (fileType === 'application/pdf') {
        pdfFile = await convertBlobToPdf(blob);
    } else {
        pdfFile = await convertImageToPdf(blob, fileType);
    }
    const fileBlob = new Blob([pdfFile.buffer], { type: fileType });
    const buffer = await fileBlob.arrayBuffer();
    return buffer;
}

async function convertBlobToPdf(blob: string) {
    const pdfDoc = await PDFDocument.create();
    const arrayBuffer = await fetch(blob).then(res => res.arrayBuffer());
    const pdfWithContent = await PDFDocument.load(arrayBuffer);
    const pages = await pdfDoc.copyPages(pdfWithContent, pdfWithContent.getPageIndices());
    // Add all the pages from the document
    pages.forEach(page => {
        pdfDoc.addPage(page);
    });
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

export async function convertImageToPdf(blob: string, type: string) {
    const arrayBuffer = await fetch(blob).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    const image = type === 'image/jpeg' ? await pdfDoc.embedJpg(arrayBuffer) : await pdfDoc.embedPng(arrayBuffer);
    const imgReduced = image.scale(0.3);
    const page = pdfDoc.addPage();
    page.drawImage(image, {
        x: 10,
        y: 10,
        width: imgReduced.width,
        height: imgReduced.height,
    });
    const pdfBytes = await pdfDoc.save();
    // Serialize the PDFDocument to bytes (a Uint8Array)
    return pdfBytes;
}
