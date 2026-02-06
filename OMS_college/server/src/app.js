import express from "express"

import cors from "cors"

import cookieParser from "cookie-parser"

import { errorHandler } from "./middlewares/error.middleware.js"

// use - for middlewares and configurations
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
credentials: true
}))  
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from './routes/user.routes.js'
import opportunityRouter from "./routes/opportunity.routes.js";



//routes decleration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/opportunities", opportunityRouter);










app.use(errorHandler)
export default app