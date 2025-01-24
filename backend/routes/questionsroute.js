const express = require('express');
const { question, getspecificquestion, runCode, submitCode } = require('../controller/question.js');
const router = express.Router();

router.get("/questions", question);
router.get("/questions/:id", getspecificquestion);
router.post("/run", runCode);
router.post("/submit", submitCode);

module.exports = router;