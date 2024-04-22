import mongoose from "mongoose";
import model from "./model.js";
import CourseModel from "../courses/model.js";

export const createQuiz = async (courseId, quizz) => {
  delete quizz._id;
  try {
    const course = await CourseModel.exists({ _id: courseId });
    if (!course) {
      throw new Error("Course not found");
    }
  } catch (error) {
    return new Error("Course not found");
  }
  quizz.course = courseId;
  return model.create(quizz);
};

export const findAllQuizzes = (courseId) => model.find({ course: courseId });

export const findQuizById = (quizId) => model.findById(quizId);

export const updateQuiz = (quizId, quiz) =>
  model.updateOne({ _id: quizId }, { $set: quiz });
