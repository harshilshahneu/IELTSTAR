import mongoose from "mongoose";
/**
 * Schema used for mongodb collection items
 */
const Schema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: "Question Id is required",
    },
    questionCategory: {
      type: String,
      required: "Question Category is required",
    },
    questionTitle: {
      type: String,
      required: "Question Title is required",
    },
    questionDescription: {
      type: String,
      default: "",
    },
    questionOptions: {
      type: {que_options:{type: String}},
      default: [],
    },
    questionType: {
      type: String,
      default: "Question Type is required",
    },
    correctAnswer: {
      type: String,
      default: "Correct Answer is required",
    },
  },
  { versionKey: false }
);

Schema.virtual("id", () => this._id.toHexString());
Schema.set("toJSON", { virtuals: true });
const model = mongoose.model("questions", Schema);

export default model;
