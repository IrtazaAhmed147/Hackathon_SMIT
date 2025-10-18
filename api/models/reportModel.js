import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        
    },
    reportName: {
        type: String,
        required: true,

        lowercase: true,
    },
    
    doctor: {
        type:String,
    },
    hospital: {
        type:String,
    },

    reportPdf: {
        required: true,
        type: String,
    },

},
    { timestamps: true }
)

export default mongoose.model("report", reportSchema)