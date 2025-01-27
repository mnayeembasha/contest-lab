var express = require('express');
var  router = express.Router();
var {createContest} = require('../controller/createContest');
var { joinContest } = require('../controller/joinContest');
var {stopContest} = require('../controller/stopContest');
var {submitContest} = require('../controller/submitContest');

router.post('/create', createContest);
router.post('/join', joinContest);
router.post('/stop', stopContest);
router.post('/submit', submitContest);

module.exports = router;