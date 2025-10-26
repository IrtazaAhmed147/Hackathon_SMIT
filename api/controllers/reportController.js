import reportModel from "../models/reportModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
export const createReport = async (req, res) => {
  try {
    console.log(req.body);
    
    const { reportName, doctor, hospital, memberId } = req.body;
    const file = req.file;

    if (!reportName) return errorHandler(res, 400, "Report name is required");

    let pdfUrl = null;
    if (file) {
      const uploadResult = await uploadOnCloudinary(file, "report-pdf");
      pdfUrl = uploadResult.secure_url;
    }

    const reportData = new reportModel({
      userId: req.user.id,
      familyMemberId: memberId || null, // optional
      reportName,
      doctor,
      hospital,
      reportPdf: pdfUrl,
    });

    await reportData.save();

    successHandler(res, 201, "Report created successfully", reportData);
  } catch (error) {
    errorHandler(res, 400, error.message);
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reportData = await reportModel
      .find({ userId: req.user.id, familyMemberId: null })
      .sort({ createdAt: -1 });

    successHandler(res, 200, "All user reports fetched", reportData);
  } catch (err) {
    errorHandler(res, 400, err.message);
  }
};

export const getFamilyMemberReports = async (req, res) => {
  try {
    const { memberId } = req.params;

    const reportData = await reportModel
      .find({ userId: req.user.id, familyMemberId: memberId })
      .sort({ createdAt: -1 });

    if (!reportData.length)
      return successHandler(res, 200, "No reports found for this member", []);

    successHandler(res, 200, "Family member reports fetched", reportData);
  } catch (err) {
    errorHandler(res, 400, err.message);
  }
};



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