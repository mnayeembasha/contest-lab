var Contest = require('../models/contestModel'); 
var UserContest = require('../models/usercontestModel');
exports.joinContest  =   async (req, res) => {
    const { userId, contestId } = req.body;
  
    try {
      const contest = await Contest.findById(contestId);
      if (!contest) return res.status(404).json({ message: 'Contest not found.' });
  
      const userContest = new UserContest({
        userId,
        contestId,
        submissions: contest.questions.map(question => ({
          questionId: question._id,
          code: '',
          submissionTime: null,
          isSubmitted: false,
          timeTaken: 0
        }))
      });
  
      await userContest.save();
      res.status(200).json({ message: 'Joined contest successfully.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  