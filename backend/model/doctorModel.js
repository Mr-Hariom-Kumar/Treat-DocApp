import mongoose from 'mongoose'
const doctorSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    available:{type:Boolean,default:true},
    fees:{type:Number,default:true},
    address:{type:Object,required:true},
    date:{type:Date,required:true},
    slot_booked:{type:Object,default:{}}


},{minimize:false}) //it allow to have a data with empty object otherwise we cant insert "slot_booked" in our database with defaultr as an empty object

const doctorModel=mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel