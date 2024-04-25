import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizzes" },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blanks"],
      default: "Multiple Choice",
    },
    points: { type: Number, default: 0 },
    question: String,
    title: { type: String },
    choices: [{ type: String }],
    correctAnswer: String,
    blanksAnswers: [{ type: String }],
  },
  { collection: "questions" }
);

export default questionSchema;
