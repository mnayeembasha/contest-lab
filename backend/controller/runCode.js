const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");const { log } = require("console");
;


// JDoodle API credentials
const JDOODLE_CLIENT_ID = "1f4817209d0f4dd33c9c424d030a4465"; 
const JDOODLE_CLIENT_SECRET = "eb5766d9e35033ddfe798299d4c2acf230c8ac2525bf575d711be18de7e534c0";
const JDOODLE_URL = "https://api.jdoodle.com/v1/execute";





const questions = {
  "2c5ee640-c477-4a3e-98c9-5fcaee6aaa43": {
    title: "Pascal's Triangle",
    description: "Write a program to return the nth row of Pascal’s Triangle.",
    testCases: [
      { input: "[1, 2, -3, 4, 5]", expected: "True" },
      { input: "[1, 2, 3, 4, 5]", expected: "False" },
    ],
  },
};


exports.runCode = async (req, res) => {
  const { code, language, versionIndex, questionId } = req.body;

  console.log(code, language, versionIndex, questionId);
  
  // if (!code || !language || !versionIndex || !questionId) {
  //   return res.status(400).json({ error: "Missing required fields." });
  // }

  const question = questions[questionId];
  if (!question) {
    return res.status(404).json({ error: "Question not found." });
  }

  const inputFilePath = "input.txt";
  const outputFilePath = "output.txt";
  const expectedFilePath = "expected_output.txt";

  // Prepare input and expected output files
  const inputs = question.testCases.map(tc => tc.input).join("\n");
  const expectedOutputs = question.testCases.map(tc => tc.expected || "null").join("\n");

  fs.writeFileSync(inputFilePath, inputs, "utf8");
  fs.writeFileSync(expectedFilePath, expectedOutputs, "utf8");

  try {
    // Prepare inputs and expected outputs as a single batch
    const inputsArray = question.testCases.map(tc => tc.input);
    const expectedOutputsArray = question.testCases.map(tc => tc.expected || "null");

    // Call JDOODLE API once for all test cases
    const response = await axios.post(JDOODLE_URL, {
      clientId: JDOODLE_CLIENT_ID,
      clientSecret: JDOODLE_CLIENT_SECRET,
      script: code,
      stdin: inputsArray.join("\n"),  // Combine all inputs into a single string
      language,
      versionIndex,
    });

    // Capture output from API response
    const output = response.data.output?.trim();

    // Split the output back into separate results for each test case
    const outputArray = output ? output.split("\n") : [];

    const results = [];
    for (let i = 0; i < question.testCases.length; i++) {
      const input = question.testCases[i].input;
      const expected = question.testCases[i].expected;
      const caseOutput = outputArray[i]?.trim() || "";

      // Save output to output.txt
      fs.appendFileSync(outputFilePath, `${caseOutput}\n`, "utf8");

      const normalize = (str) => (str ? str.replace(/\s+/g, "") : "");

      // Compare output with expected value
      if (normalize(caseOutput) === normalize(expected)) {
        results.push({
          input,
          output: caseOutput,
          expected,
          success: true,
        });
      } else {
        return res.status(200).json({
          error: "Logical Error",
          testCase: { input, expected, output: caseOutput },
        });
      }
    }

    res.status(200).json({
      message: "Code executed successfully for all test cases.",
      results,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error during code execution.",
      details: error.message,
    });
  }
};
