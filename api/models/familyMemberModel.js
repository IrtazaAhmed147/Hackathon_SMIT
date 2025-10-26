import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    memberName: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
   age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },

   
  },
  { timestamps: true } 
);

export default mongoose.model("familyMember", familyMemberSchema);
