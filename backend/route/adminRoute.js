import express from 'express'
import { addDoctor,allDoctors,loginAdmin,appointmentAdmin,cancelAdminAppointment,adminDashboard } from '../controller/adminController.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailability } from '../controller/doctorController.js'

const adminRouter=express.Router()
adminRouter.post('/add-doctors',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/cancel-appointments',authAdmin,cancelAdminAppointment)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export default adminRouter