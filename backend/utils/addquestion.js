const { v4: uuidv4 } = require("uuid");

export default  function  addQuestion (title, description, testCases, templateCode) {
    const id = uuidv4();
    questions[id] = {
      title,
      description,
      testCases,
      templateCode,
    };
    return id;
  };