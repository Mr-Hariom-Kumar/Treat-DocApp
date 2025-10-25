import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import {connectDB} from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './route/adminRoute.js'
import doctorRouter from './route/doctorRoute.js'
import userRouter from './route/userRoute.js'

const app=express()
const port =process.env.PORT ||4000



//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://treat-doc-app.vercel.app',  // Your actual frontend URL
        'https://treat-doc-app-frontend-70eqyefsy-mr-hariom-kumars-projects.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'atoken']
}
))

connectDB()
connectCloudinary()
//endpoint

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    console.log("API IS WORKING AT HOME PAGE")
})
app.listen(port,()=>{
    console.log(`app is listening on ${port}`)
})





