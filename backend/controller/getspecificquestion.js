const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");;
const addQuestion = (title, description, testCases, templateCode) => {
  const id = uuidv4();
  questions[id] = {
    title,
    description,
    testCases,
    templateCode,
  };
  return id;
};
const questions = {
    "2c5ee640-c477-4a3e-98c9-5fcaee6aaa43": {
      title: "Pascal's Triangle",
      description: "Write a program to return the nth row of Pascal’s Triangle.",
      testCases: [
        { input: "0", expected: "1" },
        { input: "1", expected: "1,1" },
        { input: "2", expected: "1,2,1" },
        { input: "5", expected: "1,5,10,10,5,1" },
        { input: "33", expected: null },
      ],
    },
  };
// Add a sample question for Pascal's Triangle

exports.getspecificquestion = (req, res) => {
  const { id } = req.params;
  const question = questions[id];

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.status(200).json({ question });
};

// Route to fetch all questions
exports.question =  (req, res) => {
    const questionList = Object.keys(questions).map((id) => ({
      id,
      title: questions[id].title,
      description: questions[id].description,
    }));
    res.status(200).json({ questions: questionList });
  };