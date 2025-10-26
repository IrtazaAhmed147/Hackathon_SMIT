import express from "express";
import { createFamilyMember, getFamilyMembers, getSingleFamilyMember } from "../controllers/familyMemberController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const familyMemberRouter = express.Router();

// ✅ Routes
familyMemberRouter.post("/create", verifyToken, createFamilyMember);
familyMemberRouter.get("/", verifyToken, getFamilyMembers);
familyMemberRouter.get("/:id", verifyToken, getSingleFamilyMember);

export default familyMemberRouter;
