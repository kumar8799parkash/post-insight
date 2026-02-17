import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import analyzeRouter from './routes/analyzeRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* app.use(cors()); */
app.use(cors({ origin: "*" }));

app.use(express.json());

app.get('/' , (req ,res)=>{
    res.send("Hello world this is parker");
})


app.get("/health", (req, res) => {
  res.sendStatus(200);
});

app.use('/api' , analyzeRouter);

app.listen(PORT , ()=>{
    console.log(`App is listening on port - ${PORT}`);
})




