import tesseract from 'tesseract.js'

async function extractOCRText(filePath){
    const result = await tesseract.recognize(filePath , "eng");
    return result.data.text;
}

export default extractOCRText;