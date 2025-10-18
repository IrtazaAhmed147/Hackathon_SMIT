import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bloodPressure: {
        type: String,
        required: true,        
    },
    
    sugar: {
        type:String,

    },

    weight: {
        required: true,
        type: String,
    },
    note: {
        required: true,
        type: String,
        lowercase: true,
    },

},
    { timestamps: true }
)

export default mongoose.model("vital", vitalSchema)