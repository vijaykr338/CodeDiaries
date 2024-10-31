import express from "express";
import profileRouter from "./src/routes/profile.route.js";
import commentsRouter from "./src/routes/comments.route.js"; 
import postsRouter from './src/routes/posts.route.js';
import authRouter from './src/routes/auth.route.js';
import cors from "cors";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })  
);  

app.use(express.static("public"));

app.use("/profile", profileRouter);
app.use("/comments", commentsRouter); 
app.use('/posts', postsRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});  

//next yaha basically middleware ke paas bhej rha hai, and handle errors if any

export default app;


