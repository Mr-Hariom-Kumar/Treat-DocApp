import validator from 'validator'
import bcrypt, { genSalt } from 'bcrypt'
import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
// import {v2 as cloudinary} from 'cloudinary'
import connectCloudinary from '../config/cloudinary.js'
import doctorModel from '../model/doctorModel.js'
import appointmentModel from '../model/appointmentModel.js'
import razorpay from 'razorpay'


const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!email || !name || !password){
            res.json({success:false,message:"missing details"})
        }
        if (!validator.isEmail(email)){
            res.json({success:false,message:"Enter a valid email"})
        }
        if(password.length<8){
            res.json({success:false,message:"enter strong password(i.e length >=8)"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }

        const newUser= new userModel(userData)
        const user= await newUser.save()

        const token =jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({success:true,token})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}
const loginUser=async (req,res)=>{

    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
           return res.json({success:false,message:"no user found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credential"})
        }

    }catch(error){

    }

}

//api to get user profile data
const getProfile=async (req,res)=>{
    try{
        const {userId}=req.body // we are going to take it userId as token and not email or anyother thing 
        //remember you did res.json({success:true,token}) you got only these infos 
        const userData=await userModel.findById(userId).select("-password")

        res.json({success:true,userData})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

//api to update user profile
const updateProfile= async (req,res)=>{
    const {userId,name,phone, address,dob,gender}=req.body
    const imageFile=req.file

    const cloudinary= await connectCloudinary()

    if(!name || !phone || !dob || !gender){
        res.json({success:false,message:"Missing details"})
    }

    await userModel.findByIdAndUpdate(userId,{name,phone,address: typeof address==='string'? JSON.parse(address):address,dob,gender})

    if(imageFile){
        //upload image to claudinary

        try{
            const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageURL=imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }catch(error){
            res.json({success:false,message:error.message})
            console.log(error)
        }
        
    }

    res.json({success:true,message:"profile updated "})

}

//api to book appointment
const bookAppointment=async (req,res)=>{
    try{
        const {userId,docId,slotDate,slotTime}=req.body
        const docData=await doctorModel.findById(docId).select('-password')

        if(!slotTime || slotTime.trim() === ''){
            return res.json({success:false,message:"Please select a time slot"})
        }

        if(!docData.available){
            return res.json({success:false,message:"Doctor not Available"})
        }

        let slots_booked=docData.slot_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate]==='X'){
                return res.json({success:false,message:"Doctor not Available"})
            }
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:"Doctor not Available"})
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)

        }

        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        const newAppointment= new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slot data in doctor data
        await doctorModel.findByIdAndUpdate(docId,{slot_booked:slots_booked})
        res.json({success:true,message:'Appointment Booked'})
    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
}

const listAppointment=async (req,res)=>{
    try{
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})
        
    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
}

const cancelAppointment=async (req,res)=>{
    try{
        const {userId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        if(appointmentData.userId!=userId){
            return res.json({success:false,message:"unautharised action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

        //releasing data 
        const {docId,slotTime,slotDate}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slot_booked=doctorData.slot_booked
        slot_booked[slotDate]=slot_booked[slotDate].filter(e=>e!=slotTime)

        await doctorModel.findByIdAndUpdate(docId,{slot_booked})

        res.json({success:true,message:"Appointment cancelled"})

    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
}
const removeUserAppointment=async (req,res)=>{
    try{
        const {appointmentId}=req.body
        await appointmentModel.findByIdAndDelete(appointmentId)
        res.json({success:true,message:"Appointment deleted successfully!"})
    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
   
}
const razorpayInstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
//api for payment  using razorpay
const paymentRazorpay=async (req,res)=>{

    try{

        const {appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        if(!appointmentData || appointmentData.cancelled){
            console.log("error found line no 220 userController")
           return res.json({success:false,message:"Appointment is either cancelled or not found"})
        }

   //create option for razorpay payment
        const options={
            amount:appointmentData.amount*100,
            currency:process.env.CURRENCY,
            receipt:appointmentId
        }

   //create order
        const order=await razorpayInstance.orders.create(options)
        console.log("error found line no 233 userController")
        res.json({success:true,order})

    }catch(error){
        console.log("error found line no 237 userController")
        res.json({success:false,message:error.message})
        console.log(error)
    }
   

    
}


//apiu to verify razorpay payment
const verifyPayment=async (req,res)=>{
    try{

      const {razorpay_order_id}=req.body
      const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)

      console.log(orderInfo)

      if(orderInfo.status==='paid'){
        await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        res.json({success:true,message:"payment successfull"})
      }else{
        res.json({success:false,message:"payment failed"})
      }

    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,removeUserAppointment, verifyPayment}