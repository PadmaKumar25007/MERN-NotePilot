import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import notesRoutes from './routes/notesRoute.js';
import { connectDB } from './config/DB.js';
import rateLimiter from './middleware/rateLimiter.js';

const app = express();

dotenv.config();

//middleware
app.use(cors({
  origin:"http://localhost:5173"
}))

app.use(express.json()); //Middleware to parse req.body

app.use(rateLimiter);  //Our custom middleware(rateLimiter)

app.use("/api/notes", notesRoutes);

connectDB().then( () => {app.listen(5001,()=>{
    console.log("Server is running on port : 5001");
  });
});
