import cloudinary from "../config/cloud.config.js"
import File from "../model/file.model.js"
import User from "../model/auth.model.js"

export const uploadfile=async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                success:false,
                msg:"File is required.."
            })
        }

        const {filename}=req.body
        if(!filename){
            return res.status(400).json({
                success:false,
                msg:"File name is required.."
            })
        }

        const result= await new Promise((resolve,reject)=>{
            const stream=cloudinary.uploader.upload_stream(
                {
                    folder:"files",
                    resource_type:"auto"
                },
                (error,result)=>{
                    if(error){
                        return reject(error)
                    } else {
                        return resolve(result)
                    }
                }

            )
            stream.end(req.file.buffer)
        })
        const file= await File.create({
            filename,
            fileURL:result.secure_url,
            createdBy:req.user._id

        })
        await User.findByIdAndUpdate(req.user._id,{$push:{files:file._id}})

        return res.status(201).json({
            success:true,
            msg:"File uploaded successfully",
            file
        })


    }catch (error) {
        console.error("file upload error:", error.message) 
        return res.status(500).json({
            success:false,
            msg:"Server error"
        })
    }
}