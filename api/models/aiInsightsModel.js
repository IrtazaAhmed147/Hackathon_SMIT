import mongoose from "mongoose";

const AiInsightSchema = new mongoose.Schema(
  {
    // Which user this insight belongs to
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to the uploaded file/report
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "report",
      required: true,
    },

    // AI generated summaries
    summaryEnglish: {
      type: String,
      required: true,
    },
    summaryRomanUrdu: {
      type: String,
      required: true,
    },

    abnormalValues: [
      {
        parameter: String, // e.g., "WBC", "Hb"
        value: String, // e.g., "High", "Low"
      },
    ],

    doctorQuestions: [
      {
        type: String,
      },
    ],
    suggestions: [
      {
        type: String,
      },
    ],

    disclaimer: {
      type: String,
      default:
        "AI insights are for understanding purposes only. Always consult your doctor.",
    },
  },
  { timestamps: true } 
);

export default mongoose.model("AiInsight", AiInsightSchema);
