import * as dao from "./dao.js";

export default function (app) {
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const quiz = await dao.createQuiz(courseId, req.body);
    if (quiz instanceof Error) {
      res.status(400).json(quiz.message);
      return;
    }
    res.json(quiz);
  };

  const findAllQuizzes = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findAllQuizzes(courseId);
    res.json(quizzes);
  };

  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };

  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.get("/api/courses/:courseId/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:quizId", findQuizById);
}
