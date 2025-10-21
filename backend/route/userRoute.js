import express from 'express'
import { loginUser, registerUser,getProfile,updateProfile, bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,removeUserAppointment, verifyPayment } from '../controller/userController.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'
const userRouter=express.Router()
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.post('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointments',authUser,cancelAppointment)
userRouter.post('/remove-user-appointments',authUser,removeUserAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser, verifyPayment)

export default userRouter
