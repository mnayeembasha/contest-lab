var Contest = require('../models/contestModel'); 
var UserContest = require('../models/usercontestModel'); 
var Question = require('../models/questionModel');
exports.submitContest  =  async (req, res) => {
    const { userId, contestId, questionId, code } = req.body;
  
    try {
      const userContest = await UserContest.findOne({ userId, contestId });
      if (!userContest) return res.status(404).json({ message: 'Contest not found for user.' });
  
      const question = await Question.findById(questionId);
      if (!question) return res.status(404).json({ message: 'Question not found.' });
  
      const questionIndex = userContest.submissions.findIndex(sub => sub.questionId.toString() === questionId.toString());
  
      if (questionIndex === -1) {
        return res.status(404).json({ message: 'Question not part of this contest.' });
      }
  
      const submission = userContest.submissions[questionIndex];
  
      // Check if the contest time is over
      const contest = await Contest.findById(contestId);
      const timeLeft = (new Date()).getTime() - contest.startTime.getTime();
      if (timeLeft > contest.duration * 60 * 1000) {
        return res.status(400).json({ message: 'Time for the contest has ended.' });
      }
  
      // Save submission code and time taken
      submission.code = code;
      submission.submissionTime = new Date();
      submission.isSubmitted = true;
  
      const startTime = new Date(submission.submissionTime);
      const endTime = new Date();
      submission.timeTaken = (endTime - startTime) / 1000;
  
      await userContest.save();
  
      res.status(200).json({ message: 'Code submitted successfully.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  