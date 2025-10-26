import express from 'express'
import { createReport, deleteReport, getAllReports, getFamilyMemberReports } from '../controllers/reportController.js'
import multer from 'multer';
import { verifyToken } from '../middleware/verifyToken.js';

const reportRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



reportRouter.post('/create',verifyToken,upload.single('reportPdf'), createReport)
reportRouter.get('/',verifyToken, getAllReports)
reportRouter.get("/family/:memberId",verifyToken, getFamilyMemberReports)
reportRouter.delete("/:id", verifyToken, deleteReport);


export {reportRouter};