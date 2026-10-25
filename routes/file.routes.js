import express from "express";
import { uploadfile } from "../controller/file.controller.js";
import { extractContent } from "../controller/extraction.controller.js";
import { upload } from "../multerware/multer.middlerware.js";
import { authMiddleware } from "../multerware/auth.middleware.js";

const router=express.Router()

router.post("/upload",authMiddleware,upload.single("file"),uploadfile)
router.post("/extract",authMiddleware,upload.single("screenshot"),extractContent)

export default router