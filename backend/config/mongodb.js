import mongoose from 'mongoose'
export const connectDB=async ()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}/Treat`).then(()=>{
        console.log("Database is connected successfully")
    })
}

