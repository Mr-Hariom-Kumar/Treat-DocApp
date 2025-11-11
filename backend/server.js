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
app.use(cors({
  origin: '*', // allow all domains
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // required for JWT header
}));
app.options('*', cors());


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





