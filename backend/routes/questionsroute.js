const express = require('express');
const {  runCode } = require('../controller/runCode.js');
const { submitCode } = require('../controller/submitCode.js');
const { question, getspecificquestion } = require('../controller/getspecificquestion.js');
const router = express.Router();

router.get("/questions", question);
router.get("/questions/:id", getspecificquestion);
router.post("/run", runCode);
router.post("/submit", submitCode);

module.exports = router;