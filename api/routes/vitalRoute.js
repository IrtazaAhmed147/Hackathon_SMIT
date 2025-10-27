import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js';
import { createVitals, deleteVital, getAllVitals, getMemberVitals, getSingleVital, updateVital } from '../controllers/vitalController.js';

const vitalRouter = express.Router()





vitalRouter.post('/create',verifyToken, createVitals)
vitalRouter.get('/', verifyToken,getAllVitals)
vitalRouter.get('/:memberId', verifyToken,getMemberVitals)
vitalRouter.get('/single/:id', verifyToken,getSingleVital)
vitalRouter.delete('/:id', verifyToken,deleteVital)
vitalRouter.post('/update/:id', verifyToken,updateVital)

export {vitalRouter};