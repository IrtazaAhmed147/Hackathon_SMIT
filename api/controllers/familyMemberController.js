// import familyMemberModel from "../models/familyMemberModel.js";
import familyMemberModel from "../models/familyMemberModel.js";
import { successHandler, errorHandler } from "../utils/responseHandler.js";

// ✅ Create a new family member
export const createFamilyMember = async (req, res) => {
  try {
    console.log(req.body);
    const { name, relation, age, gender } = req.body;


    // Validate fields
    if (!name || !relation || !age || !gender) {
      return errorHandler(res, 400, "All fields are required");
    }

    // Create a new member
    const newMember = new familyMemberModel({
      userId: req.user.id,
      memberName: name,
      relation,
      age,
      gender,
    });

    await newMember.save();
    successHandler(res, 201, "Family member created successfully", newMember);
  } catch (error) {
    console.error("Error creating family member:", error);
    errorHandler(res, 500, "Server error while creating family member");
  }
};

// ✅ Get all family members of logged-in user
export const getFamilyMembers = async (req, res) => {
  try {
    const members = await familyMemberModel.find({ userId: req.user.id }).sort({ createdAt: -1 });

    successHandler(res, 200, "Family members fetched successfully", members);
  } catch (error) {
    console.error("Error fetching family members:", error);
    errorHandler(res, 500, "Server error while fetching family members");
  }
};
export const getSingleFamilyMember = async (req, res) => {
  try {
    const { id } = req.params; // family member ID from URL

    const member = await familyMemberModel.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!member) {
      return errorHandler(res, 404, "Family member not found or not authorized");
    }

    successHandler(res, 200, "Family member fetched successfully", member);
  } catch (error) {
    console.error("Error fetching family members:", error);
    errorHandler(res, 500, "Server error while fetching family members");
  }
};
