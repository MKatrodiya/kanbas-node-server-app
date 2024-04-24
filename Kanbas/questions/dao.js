import model from "./model.js";
import QuizModel from "../quizzes/model.js";

export const createQuestion = async (quizId, question) => {
  delete question._id;
  try {
    const quiz = await QuizModel.exists({ _id: quizId });
    if (!quiz) {
      throw new Error("Quiz not found");
    }
  } catch (error) {
    return new Error("Quiz not found");
  }
  question.quiz = quizId;
  const newQuestion = await model.create(question);
  await QuizModel.updateOne(
    { _id: quizId },
    { $push: { questions: newQuestion._id } }
  );
  return newQuestion;
};

export const findAllQuestions = (quizId) => model.find({ quiz: quizId });

export const findQuestionById = (questionId) => model.findById(questionId);

export const updateQuestion = (questionId, question) =>
  model.updateOne({ _id: questionId }, { $set: question });
