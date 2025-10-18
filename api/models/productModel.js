import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,

        lowercase: true,
    },
    productDescription: {
        type: String,
        required: true,

        lowercase: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productImage: {
        required: true,
        type: String,
    },

},
    { timestamps: true }
)

export default mongoose.model("product", productSchema)