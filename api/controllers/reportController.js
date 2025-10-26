import reportModel from "../models/reportModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";
import aiInsightsModel from "../models/aiInsightsModel.js";

export const createReport = async (req, res) => {
  try {
    const { reportName, doctor, hospital, memberId } = req.body;
    const file = req.file;

    if (!reportName?.trim() || !doctor?.trim() || !hospital?.trim() || !memberId || !file) {
      return errorHandler(res, 400, "Missing required fields");
    }

    let pdfUrl;
    try {
      const uploadResult = await uploadOnCloudinary(file, "report-pdf");
      pdfUrl = uploadResult.secure_url;
    } catch (uploadErr) {
      return errorHandler(res, 500, "PDF upload failed. Please try again.");
    }

    const reportData = new reportModel({
      userId: req.user.id,
      familyMemberId: memberId || null,
      reportName,
      doctor,
      hospital,
      reportPdf: pdfUrl,
    });

    await reportData.save();

    successHandler(res, 201, "Report created successfully", { id: reportData._id });
  } catch (error) {
    errorHandler(res, 500, error.message || "Something went wrong");
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


export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find report to ensure it belongs to current user
    const report = await reportModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!report) {
      return errorHandler(res, 404, "Report not found or unauthorized");
    }

    // Delete AI insights linked to this report
    await aiInsightsModel.deleteMany({ reportId: id });

    // Delete the report itself
    await reportModel.findByIdAndDelete(id);

    successHandler(res, 200, "Report deleted successfully");
  } catch (error) {
    console.error("Error deleting report:", error);
    errorHandler(res, 500, "Failed to delete report", error.message);
  }
};