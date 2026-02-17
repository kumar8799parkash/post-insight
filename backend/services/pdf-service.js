/* import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const pdfParse = pdfParseModule.default || pdfParseModule;

async function extractPDFText(filePath){
    const databuffer = fs.readFileSync(filePath);
    const data = await pdfParse(databuffer);
    return data.text;
}

export default extractPDFText; */
/* import pdfParse from "pdf-parse"; */

/* import fs from "fs";
import pkg from "pdf-parse";
const pdfParse = pkg;

async function extractPDFText(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
}

export default extractPDFText; */
/* 
import fs from "fs";

async function extractPDFText(filePath) {
    const pdfParse = (await import("pdf-parse")).default;

    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    return data.text;
}

export default extractPDFText; */

import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

async function extractPDFText(filePath) {
    const data = new Uint8Array(fs.readFileSync(filePath));

    const loadingTask = pdfjsLib.getDocument({ data });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map(item => item.str);
        fullText += strings.join(" ") + "\n";
    }

    return fullText;
}

export default extractPDFText;

