import mongoose from "mongoose";
/**
 * Schema used for mongodb collection items
 */
const Schema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: "Name is required",
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        required: "Type is required",
        enum: ["General", "Academic"],
    },
    date: {
        type: Date,
        required: "Date is required",
    }
  },
  { versionKey: false, timestamps: true }
);

const model = mongoose.model("Exam", Schema);

export default model;
