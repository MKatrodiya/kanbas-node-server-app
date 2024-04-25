import model from "./model.js";

export const createAnswer = async (quizId, userId, answer) => {
  if (model.find({ quiz: quizId, user: userId }).length == 0) {
    delete answer._id;
    answer.quiz = quizId;
    answer.user = userId;
    return model.create(answer);
  }
};

export const findAnswers = async (quizId, userId) => {
  return model.find({ quiz: quizId, user: userId });
};

export const updateAnswer = async (quizId, userId, answer) => {
  return model.updateOne({ quiz: quizId, user: userId }, answer);
};
