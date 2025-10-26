import express from "express";
import { analyzeReport, getSingleAiInsights } from "../controllers/aiController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const aiRouter = express.Router();

aiRouter.post("/analyze/:id", verifyToken, analyzeReport);
aiRouter.get("/:id", verifyToken, getSingleAiInsights);

export {aiRouter}
