const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;
const questionSchema = new Schema({
    _id: { type: String, default: uuidv4 },
    title: String,
    description: String,
    testCases: [{
      input: String,
      expected: String
    }]
  });
  
  const Question = mongoose.model('Question', questionSchema);
  module.exports = Question;
  