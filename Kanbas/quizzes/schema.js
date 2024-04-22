import mongoose from "mongoose";

const quizzSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
    points: Number,
    description: String,
    dueDate: Date,
    availableDate: Date,
    availableUntil: Date,
    assignmentGroup: {
      type: String,
      enum: ["Quizzes", "Exams", "Assignments", "Project"],
      default: "Quizzes",
    },
    shuffleAnswers: { type: Boolean, default: false },
    timeLimit: Number,
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: Boolean, default: false },
    showCorrectAnswersAt: Date,
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: false },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    assignedTo: [{ type: String }],
    status: {
      type: String,
      enum: ["Unpublished", "Published", "Closed"],
      default: "Unpublished",
    },
  },
  { collection: "quizzes" }
);

export default quizzSchema;
