import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
import multer from "multer";


import userRoutes from "./routes/userRouter.js";
import convRoutes from "./routes/conversationRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import postRoutes from './routes/postRouter.js'
import errorHandler from './middleware/errorHandler.js'
import { verifyEmail } from "./controllers/userController.js";
import cookieParser from 'cookie-parser';
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();


const PORT =process.env.PORT || 5000;
const URI = process.env.MONGODB_URL || "mongodb://localhost:27017/instagram_clone"



const app = express();

//MongoDB connect
//mongoose.connect('mongodb://localhost/instagram-clone-db').then(()=> console.log('DB Connected Successfuly'));

mongoose.connect(URI).then(()=>{console.log('mit mongoDB verbunden')}).catch((err)=>console.log(err))
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
     origin: process.env.CLIENT || 'http://localhost:3000',
    credentials: true, 
  })
); 
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded succesfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.use("/users", userRoutes)
app.use("/message", messageRoutes);
app.use("/posts", postRoutes);
app.use("/conversations", convRoutes);
app.get('/verify/:token', verifyEmail);


app.use(errorHandler);
app.listen(PORT, () => {
  
  console.log(`Server läuft und hört PORT  ${PORT} `);
});