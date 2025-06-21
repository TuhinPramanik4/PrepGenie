const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  company: String,
  role: String,
  jobDescription: String,
  resumePath: String,
  questions: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Interview', InterviewSchema);
