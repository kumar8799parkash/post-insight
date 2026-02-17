import extractOCRText from "../services/ocr-service.js";
import extractPDFText from "../services/pdf-service.js";
import analyze from "../services/rule-engine-service.js";

async function handleAnalyze(req, res){

    try {
        const file = req.file;
        let extractedText = "";
        if (file.mimetype == 'application/pdf') {
            extractedText = await extractPDFText(file.path)
        }
        else {
            extractedText = await extractOCRText(file.path);
        }
        const ruleAnalysis = analyze(extractedText);

        res.status(200).json({
            text : extractedText,
            Analysis : ruleAnalysis
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "text extraction failed!!"});
    }
    
}

export default handleAnalyze;