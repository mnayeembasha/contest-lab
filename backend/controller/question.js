const axios = require("axios");
const { v4: uuidv4 } = require("uuid");



// JDoodle API credentials


// In-memory storage for questions and test cases
let questions = {};

// Helper function to add a question dynamically
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

// Add a sample question for Pascal's Triangle
addQuestion(
  "Pascal's Triangle",
  "Write a program to return the nth row of Pascal’s Triangle.",
  [
    { input: "0", expected: "[1]" },
    { input: "1", expected: "[1,1]" },
    { input: "2", expected: "[1,2,1]" },
    { input: "5", expected: "[1,5,10,10,5,1]" },
    { input: "33", expected: null }, // Edge case
  ],
  `
def getPascalRow(rowIndex):
    if rowIndex == 0:
        return [1]
    row = [1]
    for i in range(1, rowIndex + 1):
        row.append(row[-1] * (rowIndex - i + 1) // i)
    return row

print(getPascalRow(0)) # Replace 0 with input for testing
`
);

// Route to fetch all questions
exports.question =  (req, res) => {
  const questionList = Object.keys(questions).map((id) => ({
    id,
    title: questions[id].title,
    description: questions[id].description,
  }));
  res.status(200).json({ questions: questionList });
};

// Route to fetch a single question by ID
exports.getspecificquestion = (req, res) => {
  const { id } = req.params;
  const question = questions[id];

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  res.status(200).json({ question });
};

// Route to run the code with up to 5 test cases
exports.runCode =  async (req, res) => {
  const { code, language, versionIndex, questionId } = req.body;

  if (!code || !language || !versionIndex || !questionId) {
    return res.status(400).json({ error: "Missing required fields: code, language, versionIndex, questionId" });
  }

  const question = questions[questionId];

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const testCases = question.testCases.slice(0, 5);
  const results = [];

  for (const testCase of testCases) {
    try {
      const response = await axios.post(JDOODLE_URL, {
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
        script: code,
        stdin: testCase.input,
        language,
        versionIndex,
      });

      const output = response.data.output.trim();
      results.push({
        input: testCase.input,
        expected: testCase.expected,
        output,
        success: output === testCase.expected,
      });
    } catch (error) {
      results.push({ input: testCase.input, error: error.message, success: false });
    }
  }

  res.status(200).json({ results });
};

// Route to submit code for all test cases
exports.submitCode =  async (req, res) => {
  const { id } = req.params;
  const { code, language, versionIndex } = req.body;

  const question = questions[id];

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  if (!code || !language || !versionIndex) {
    return res.status(400).json({ error: "Missing required fields: code, language, versionIndex" });
  }

  const results = [];
  let allPassed = true;

  for (const testCase of question.testCases) {
    try {
      const response = await axios.post(JDOODLE_URL, {
        clientId: JDOODLE_CLIENT_ID,
        clientSecret: JDOODLE_CLIENT_SECRET,
        script: code,
        stdin: testCase.input,
        language,
        versionIndex,
      });

      const output = response.data.output.trim();
      const success = output === testCase.expected;

      if (!success) allPassed = false;

      results.push({
        input: testCase.input,
        expected: testCase.expected,
        output,
        success,
      });

      if (!allPassed) break; // Stop further execution if one test case fails
    } catch (error) {
      allPassed = false;
      results.push({ input: testCase.input, error: error.message, success: false });
      break;
    }
  }

  if (!allPassed) {
    return res.status(400).json({ error: "Code failed some test cases", results });
  }

  res.status(200).json({ message: "Code passed all test cases!", results });
};


