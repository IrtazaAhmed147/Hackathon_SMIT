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
export const getSingleVital = async (req, res) => {
  try {
    const { id } = req.params;

    const vitalData = await vitalModel
      .findById(id)// latest first

    successHandler(res, 200, "vital fetched successfully", vitalData);
  } catch (err) {
    console.error(err);
    errorHandler(res, 400, err.message);
  }
};
export const deleteVital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const vitalData = await vitalModel.findByIdAndDelete(id);

    successHandler(res, 200, "vital deleted successfully", vitalData);
  } catch (err) {
    console.error(err);
    errorHandler(res, 400, err.message);
  }
};

export const updateVital = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const vitalData = await vitalModel.findByIdAndUpdate(id, {
      $set: req.body,
    },
      { new: true });

    successHandler(res, 200, "vital deleted successfully", vitalData);
  } catch (err) {
    console.error(err);
    errorHandler(res, 400, err.message);
  }
};
