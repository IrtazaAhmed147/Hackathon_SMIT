import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { createVitals, getAllVitals, getMemberVitals } from '../controllers/vitalController.js';

const vitalRouter = express.Router()





vitalRouter.post('/create',verifyToken, createVitals)
vitalRouter.get('/', verifyToken,getAllVitals)
vitalRouter.get('/:memberId', verifyToken,getMemberVitals)

export {vitalRouter};