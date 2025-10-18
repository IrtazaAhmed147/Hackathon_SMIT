import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { createVitals, getAllVitals } from '../controllers/vitalController.js';

const vitalRouter = express.Router()





vitalRouter.post('/create',verifyToken, createVitals)
vitalRouter.get('/', verifyToken,getAllVitals)

export {vitalRouter};