import express from "express"  
import { generateColdEmails } from "../services/mail.services.js";
import { authMiddleware } from "../multerware/auth.middleware.js";
import { getMyEmails, getEmailById, updateEmail, deleteEmail, sendMail } from "../controller/mail.controller.js";


const router = express.Router(); 

router.post('/generate', authMiddleware, generateColdEmails);
router.get('/', authMiddleware,getMyEmails );
router.get('/:id', authMiddleware,getEmailById);
router.put('/:id', authMiddleware,updateEmail);
router.delete('/:id', authMiddleware,deleteEmail);
router.get('/send', authMiddleware,sendMail);

export default router;
