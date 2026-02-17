import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import analyzeRouter from './routes/analyzeRoutes.js';
dotenv.config();

const app = express();

/* app.use(cors()); */
app.use(cors({ origin: "*" }));

app.use(express.json());

app.get('/' , (req ,res)=>{
    res.send("Hello world this is parker");
})

app.use('/api' , analyzeRouter);

app.listen(process.env.PORT , ()=>{
    console.log(`App is listening on port - ${process.env.PORT}`);
})




