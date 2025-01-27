const mongoose = require('mongoose');
const { Schema } = mongoose;

const contestSchema = new Schema({
  title: String,
  startTime: Date,
  duration: Number, // in minutes
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
});

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
