import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // optional but good practice
    },
       familyMemberId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "familyMember",
          default: null, 
        },

    bloodPressure: {
      type: String,
      required: true,
      trim: true,
    },

    heartRate: {
      type: String,
      required: true,
      trim: true,
    },

    temperature: {
      type: String,
      required: true,
      trim: true,
    },

    bloodSugar: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: String,
      required: true,
      trim: true,
    },

    height: {
      type: String,
      required: true,
      trim: true,
    },

    note: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vital", vitalSchema);
