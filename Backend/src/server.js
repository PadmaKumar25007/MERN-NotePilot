import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import notesRoutes from './routes/notesRoute.js'
import { connectDB } from './config/DB.js'
import rateLimiter from './middleware/rateLimiter.js'
import path from "path"

const app = express()
const __dirname = path.resolve()

dotenv.config()

//middleware
if(process.env.NODE_ENV !== "production"){
app.use(cors({
  origin:"http://localhost:5173"
}))}

app.use(express.json()) //Middleware to parse req.body

app.use(rateLimiter)  //Our custom middleware(rateLimiter)

app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

connectDB().then( () => {app.listen(5001,()=>{
    console.log("Server is running on port : 5001")
  })
})
