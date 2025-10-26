import vitalModel from "../models/vitalModel.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

// ✅ Create new vital record
export const createVitals = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const {
      bloodPressure,
      heartRate,
      temperature,
      bloodSugar,
      weight,
      height,
      note,
      memberId
    } = req.body;

    // Basic validation (optional)
    if (!bloodPressure || !heartRate || !temperature || !bloodSugar || !weight || !height) {
      return errorHandler(res, 400, "Please fill all required fields");
    }

    const vitalData = new vitalModel({
      userId: req.user.id,
        familyMemberId: memberId || null, 
      bloodPressure,
      heartRate,
      temperature,
      bloodSugar,
      weight,
      height,
      note,
    });

    await vitalData.save();

    successHandler(res, 201, "Vitals created successfully", vitalData);
  } catch (error) {
    console.error(error);
    errorHandler(res, 400, error.message);
  }
};

// ✅ Get all vitals for logged-in user
export const getAllVitals = async (req, res) => {
  try {
    const vitalData = await vitalModel
      .find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // latest first

    successHandler(res, 200, "All vitals fetched successfully", vitalData);
  } catch (err) {
    console.error(err);
    errorHandler(res, 400, err.message);
  }
};
export const getMemberVitals = async (req, res) => {
  try {
     const { memberId } = req.params;

    const vitalData = await vitalModel
     .find({ userId: req.user.id, familyMemberId: memberId })
      .sort({ createdAt: -1 }); // latest first

    successHandler(res, 200, "member vitals fetched successfully", vitalData);
  } catch (err) {
    console.error(err);
    errorHandler(res, 400, err.message);
  }
};
