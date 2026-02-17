import express from "express";
import multer from "multer";
import handleAnalyze from "../controllers/analyzeController.js";
import path from 'path'


const analyzeRouter = express.Router();
/* const upload = multer({dest : '../uploads/'}); */
const upload = multer({
  dest: path.join(process.cwd(), "uploads"),
});

analyzeRouter.post('/analyze' , upload.single("myFile") , handleAnalyze);

export default analyzeRouter;