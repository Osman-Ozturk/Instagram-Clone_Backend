import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'


import userRoutes from "./routes/userRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import errorHandler from "./middleware/errorHandler.js";

const PORT = 5000;
const app = express();
dotenv.config();
//MongoDB connect
//mongoose.connect('mongodb://localhost/instagram-clone-db').then(()=> console.log('DB Connected Successfuly'));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/intagram-clone-backend');
    console.log("Conneting to mongoDB");
  } catch (error) {
    console.log(error);
  }
};
connect();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())



app.use("/auth", authRoutes);
app.use("/users", userRoutes)
app.use("/message", messageRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
  
  console.log(`Server läuft und hört PORT  ${PORT} `);
});