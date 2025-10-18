import productModel from "../models/productModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice } = req.body;
        const file = req.file

        if (file) {
            const url = await uploadOnCloudinary(file, 'product-images');
            req.body.productImage = url.secure_url
        }
        const productData = await productModel({
            productName, productDescription, productPrice, productImage: req.body.productImage
        })
        await productData.save()
        successHandler(res, 201, "product created successfully", productData)
    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllProducts = async(req,res) => {
     try {
            const productData = await productModel.find();
            successHandler(res, 200, "All products fetched", productData)
        }
        catch (err) {
            console.log(err);
            errorHandler(res, 400, err.message)
        }
}
