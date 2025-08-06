const express = require("express");
const jwtAuth = require("../middleware/jwtAuth");
const Question = require("../models/Question");
const router = express.Router();

router.get("/start", jwtAuth, async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 10 } }]); // random 10 questions
  const questionsNoAnswers = questions.map(q => ({
    _id: q._id, questionText: q.questionText, options: q.options
  }));
  res.json({ questions: questionsNoAnswers });
});

router.post("/submit", jwtAuth, async (req, res) => {
  const { answers } = req.body;
  let score = 0;
  for (let ans of answers) {
    const q = await Question.findById(ans.questionId);
    if (q && q.correctOption === ans.selected) score++;
  }
  res.json({ score });
});

module.exports = router;

