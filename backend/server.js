import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './route/adminRoute.js'
import doctorRouter from './route/doctorRoute.js'
import userRouter from './route/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

// ---- CORS: allow all origins + handle preflight globally ----
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Fallback to ensure headers are present even on errors/early exits
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// ---- Parsers ----
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ---- External services ----
connectDB()
connectCloudinary()

// ---- Routes ----
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  console.log('API IS WORKING AT HOME PAGE')
  res.send('API is working')
})

// ---- Start ----
app.listen(port, () => {
  console.log(`app is listening on ${port}`)
})
