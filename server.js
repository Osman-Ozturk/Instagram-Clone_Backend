import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config();

const PORT =process.env.PORT
const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())



app.listen(PORT,()=>{
        console.log(`Server läuft und hört PORT  ${PORT}`);
})