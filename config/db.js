import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    }
    catch(e) {
        console.error(e.message)
    }
}
export default connectDB