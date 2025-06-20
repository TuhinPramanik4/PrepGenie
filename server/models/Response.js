// models/Response.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  resumeId: mongoose.Types.ObjectId,
  company: String,
  question: String,
  answer: String,
  feedback: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Response', responseSchema);
