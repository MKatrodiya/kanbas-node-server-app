import * as dao from "./dao.js";

export default function (app) {
  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const question = await dao.createQuestion(quizId, req.body);
    if (question instanceof Error) {
      res.status(400).json(question.message);
      return;
    }
    res.json(question);
  };

  const findAllQuestions = async (req, res) => {
    const { quizId } = req.params;
    const questions = await dao.findAllQuestions(quizId);
    res.json(questions);
  };

  const findQuestionById = async (req, res) => {
    const { questionId } = req.params;
    const question = await dao.findQuestionById(questionId);
    res.json(question);
  };

  const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const status = await dao.updateQuestion(questionId, req.body);
    res.json(status);
  };

  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.get("/api/quizzes/:quizId/questions", findAllQuestions);
  app.get("/api/questions/:questionId", findQuestionById);
  app.put("/api/questions/:questionId", updateQuestion);
}
