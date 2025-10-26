import aiInsightsModel from "../models/aiInsightsModel.js";
import reportModel from "../models/reportModel.js";
import { geminiModel } from "../utils/gemini.js";
import { extractTextFromPdf } from "../utils/pdfReader.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

export const analyzeReport = async (req, res) => {
  
  
  try {
    const { id } = req.params;
    if(!id) return errorHandler(res, 404, "Report not uploaded")
    const userId = req.user.id;
    const report = await reportModel.findById(id);
    
    if (!report) return errorHandler(res, 404, "Report not found");

    // 1️⃣ Extract text from PDF
    const reportText = await extractTextFromPdf(report.reportPdf);

    // 2️⃣ Strong prompt enforcing JSON
    const prompt = `
You are a bilingual (English + Roman Urdu) AI medical assistant.

Analyze the following medical report text carefully:
---
${reportText}
---

Return ONLY a valid JSON object (no markdown, no explanation), with this structure:
{
  "summaryEnglish": "string",
  "summaryRomanUrdu": "string",
  "abnormalValues": [{"parameter": "string", "value": "string"}],
  "doctorQuestions": ["string"],
  "suggestions": ["string"]
}
`;

    // 3️⃣ Generate AI response
    const result = await geminiModel.generateContent(prompt);
    let aiResponse = await result.response.text();

    // 🧹 4️⃣ Clean Markdown formatting (```json ... ```)
    aiResponse = aiResponse.replace(/```json|```/g, "").trim();

    // 🧩 5️⃣ Try parsing JSON safely
    let parsed;
    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      console.warn("⚠️ Gemini response not valid JSON — saving raw text");
      parsed = {
        summaryEnglish: aiResponse,
        summaryRomanUrdu: "AI response could not be structured",
        abnormalValues: [],
        doctorQuestions: [],
        suggestions: [],
      };
    }

    // 6️⃣ Save AI Insight to MongoDB
    const aiInsight = await aiInsightsModel.create({
      userId,
      fileId: report._id,
      summaryEnglish: parsed.summaryEnglish || "N/A",
      summaryRomanUrdu: parsed.summaryRomanUrdu || "N/A",
      abnormalValues: parsed.abnormalValues || [],
      doctorQuestions: parsed.doctorQuestions || [],
      suggestions: parsed.suggestions || [],
    });

    // 7️⃣ Return success
    return successHandler(res, 200, "AI Summary generated successfully", aiInsight);
  } catch (error) {
    console.error("❌ Analyze Error:", error);
    return errorHandler(res, 500, "Analyze failed", error.message);
  }
};



export const getSingleAiInsights = async (req, res) => {
    try {
        const reportData = await aiInsightsModel.findOne({fileId:req.params.id}).populate("fileId");
        successHandler(res, 200, "Report found successfully", reportData)
    }
    catch (err) {
        console.log(err);
        errorHandler(res, 400, err.message)
    }
}