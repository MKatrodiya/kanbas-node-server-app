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
    {
      $push: { questions: newQuestion._id },
      $inc: { points: newQuestion.points },
    }
  );
  return newQuestion;
};

export const findAllQuestions = (quizId) => model.find({ quiz: quizId });

export const findQuestionById = (questionId) => model.findById(questionId);

export const updateQuestion = async (questionId, question) => {
  const previousQuestion = await model.findById(questionId);
  const updatedQuestion = await model.updateOne(
    { _id: questionId },
    { $set: question }
  );
  await QuizModel.updateOne(
    { _id: previousQuestion.quiz },
    { $inc: { points: question.points - previousQuestion.points } }
  );
  return updatedQuestion;
};

export const bulkCreateQuestions = async (quizId, questions) => {
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0); // get sum of points
  const updateQuestions = questions.filter((question) => question._id); // questions that have been updated
  updateQuestions.forEach(async (question) => {
    await model.updateOne({ _id: question._id }, { $set: question });
  });
  const newQuestions = questions.filter((question) => !question._id); // questions that are new
  newQuestions.forEach((question) => {
    delete question._id;
    question.quiz = quizId;
  });
  const createdQuestions = await model.insertMany(newQuestions);
  await QuizModel.updateOne(
    { _id: quizId },
    {
      $push: { questions: { $each: createdQuestions.map((q) => q._id) } },
      $set: { points: totalPoints },
    }
  );
  return [...updateQuestions, ...createdQuestions];
};

export const deleteQuestion = async (questionId) => {
  const question = await model.findById(questionId);
  await QuizModel.updateOne(
    { _id: question.quiz },
    { $pull: { questions: questionId }, $inc: { points: -question.points } }
  );
  return model.deleteOne({ _id: questionId });
};
