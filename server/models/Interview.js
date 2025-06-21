const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
  company: String,
  customCompany: String,
  role: String,
  jobDescription: String,
  resumePath: String,
  createdAt: { type: Date, default: Date.now },
  questions: [
  {
    category: String,
    question: String
  }
]
});

module.exports = mongoose.model("Interview", InterviewSchema);
