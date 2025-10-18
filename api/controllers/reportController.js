import reportModel from "../models/reportModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const createReport = async (req, res) => {
    try {
        console.log(req.user);

        const { reportName} = req.body;
        const file = req.file

        if (file) {
            console.log(file);
            
            const url = await uploadOnCloudinary(file, 'report-pdf');
            req.body.reportPdf = url.secure_url
        }
        const reportData = await reportModel({
            userId: req.user.id,
            reportName, reportPdf: req.body.reportPdf
        })
        await reportData.save()
        successHandler(res, 201, "report created successfully", reportData)
    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllReports = async(req,res) => {
     try {
            const reportData = await reportModel.find()
            successHandler(res, 200, "All reports fetched", reportData)
        }
        catch (err) {
            console.log(err);
            errorHandler(res, 400, err.message)
        }
}
