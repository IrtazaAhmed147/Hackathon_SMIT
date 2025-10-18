import express from 'express'
import { createProduct, getAllProducts } from '../controllers/productController.js'
import multer from 'multer';

const productRouter = express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })



productRouter.post('/create',upload.single('productImage'), createProduct)
productRouter.get('/', getAllProducts)

export {productRouter}