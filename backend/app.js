import express, { urlencoded } from "express";
import profileRouter from "./src/routes/profile.route.js";
import cors from "cors";

const app=express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

app.use(express.static('/public'));

app.use("/profile",profileRouter);


export default app;