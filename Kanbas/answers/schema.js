import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizzes" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    answers: [
      {
        question: { type: mongoose.Schema.Types.ObjectId, ref: "questions" },
        answer: { type: mongoose.Schema.Types.Mixed },
      },
    ],
    score: { type: Number, default: 0 },
  },
  { collection: "answers" }
);

export default answerSchema;
