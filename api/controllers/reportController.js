import reportModel from "../models/reportModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const createReport = async (req, res) => {
    try {
        console.log(req.user);
console.log(req.body);

        const { reportName, doctor, hospital} = req.body;
        const file = req.file

        if (file) {
            console.log(file);
            
            const url = await uploadOnCloudinary(file, 'report-pdf');
            req.body.reportPdf = url.secure_url
        }
        const reportData = await reportModel({
            userId: req.user.id,
            reportName, reportPdf: req.body.reportPdf,
            hospital,
            doctor
        })
        await reportData.save()
        successHandler(res, 201, "report created successfully", reportData)
    } catch (error) {
        errorHandler(res, 400, error.message)
    }
}

export const getAllReports = async(req,res) => {
  console.log(req.user);
  
     try {
            const reportData = await reportModel.find({userId: req.user.id})
            successHandler(res, 200, "All reports fetched", reportData)
        }
        catch (err) {
            console.log(err);
            errorHandler(res, 400, err.message)
        }
}


export const analyzeReport = async (req, res) => {
  try {
    const { id } = req.params;
    await connectDB();
    const report = await Report.findById(id);
    if (!report) return errorHandler(res, 404, "Report not found");

    // 🔹 Temporary mocked response for now (replace with Gemini later)
    const insight = {
      summary_en: "Your blood test shows mild vitamin D deficiency.",
      summary_roman: "Aapke test me halka Vitamin D kami nazar aayi hai.",
      vitals: [{ type: "Vitamin D", value: "18 ng/mL", normal: "30+" }],
      questions_for_doctor: [
        "Should I take supplements?",
        "Do I need sunlight exposure?",
      ],
    };

    report.insight = insight;
    report.analyzed = true;
    await report.save();

    return successHandler(res, 200, "AI Summary generated", report);
  } catch (err) {
    console.log(err);
    return errorHandler(res, 500, "Analyze failed", err.message);
  }
};