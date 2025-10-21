import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

const connectCloudinary= async ()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
    })
    return cloudinary
}
// console.log(process.env.CLOUDINARY_NAME)
// console.log(process.env.CLOUDINARY_API_KEY)
// console.log(process.env.CLOUDINARY_SECRET_KEY)
export default connectCloudinary