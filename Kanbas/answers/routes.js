import * as dao from "./dao.js";

export default function AnswersRoutes(app) {
  const createAnswer = async (req, res) => {
    const { quizId, userId } = req.params;
    const answer = await dao.createAnswer(quizId, userId, req.body);
    if (answer instanceof Error) {
      res.status(400).json(answer.message);
      return;
    }
    res.json(answer);
  };

  const findAnswers = async (req, res) => {
    const { quizId, userId } = req.params;
    const answers = await dao.findAnswers(quizId, userId);
    res.json(answers);
  };

  const updateAnswer = async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await dao.updateAnswer(quizId, userId, req.body);
    res.json(status);
  };

  app.post("/api/quizzes/:quizId/users/:userId/answers", createAnswer);
  app.get("/api/quizzes/:quizId/users/:userId/answers", findAnswers);
  app.put("/api/quizzes/:quizId/users/:userId/answers", updateAnswer);
}
