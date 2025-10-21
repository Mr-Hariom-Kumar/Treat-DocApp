//API for adding doctor
import validator from 'validator'
import bcrypt from 'bcrypt'
import doctorModel from '../model/doctorModel.js'
import connectCloudinary from '../config/cloudinary.js'
import jwt from 'jsonwebtoken'
const addDoctor=async (req,res)=>{
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"missing details"})
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Email is not valid"})
        }

        if(password.length<8){
            return  res.json({success:false,message:"Weak password"})
        }

        //hashing doctor password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //upload image on cloudinary
        const cloudinary= await connectCloudinary()
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageURL=imageUpload.secure_url

        //upload it on database
        const doctorData={
            name,
            email,
            image:imageURL,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()

        }
        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"doctor added"})


    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
    
}

//API FOR ADMIN LOGIN
const loginAdmin=async (req,res)=>{
    try{
        const {email,password}=req.body


        //creating jwt token of given password
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            

            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    }catch(error){
        res.json({success:false,message:error.message})
        console.log(error)
    }
}

const allDoctors=async (req,res)=>{
    try{
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {addDoctor,loginAdmin,allDoctors}