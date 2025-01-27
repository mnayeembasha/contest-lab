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
    