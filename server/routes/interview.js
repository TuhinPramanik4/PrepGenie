const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const Interview = require("../models/Interview");
require("dotenv").config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Setup multer
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// routes/interview.js
router.post("/feedback", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const prompt = `
You are an AI interviewer. Provide constructive feedback for the following answer.

Question: ${question}
Answer: ${answer}

Give short, clear feedback within 2–3 lines.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    res.json({ feedback: text.trim() });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});


// POST /api/interview/start
router.post("/start", upload.single("resume"), async (req, res) => {
  try {
    const { company, customCompany, role, jobDescription } = req.body;
    const resumePath = req.file ? `/uploads/${req.file.filename}` : "";
    const resumeFilePath = req.file?.path;

    // Read resume text
    const resumeText = resumeFilePath ? fs.readFileSync(resumeFilePath, "utf-8") : "";

    // Build prompt
    const prompt = `
You are an AI interviewer for ${customCompany || company}, hiring for the role of ${role}.
Generate 5 personalized interview questions based on the following resume and job description.

Resume:
${resumeText}

Job Description:
${jobDescription || "N/A"}

Return the questions in a JSON array like:
[
  { "category": "Technical", "question": "..." },
  ...
]
`;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
const cleaned = response
  .replace(/```json/g, '')
  .replace(/```/g, '')
  .trim();

const questions = JSON.parse(cleaned);

    // Save interview
    const interview = new Interview({
      company,
      customCompany,
      role,
      jobDescription,
      resumePath,
      questions
    });

    await interview.save();

    return res.status(200).json({
      message: "Interview started",
      interviewId: interview._id
    });
  } catch (err) {
    console.error("Interview Error:", err);
    return res.status(500).json({ error: "Failed to start interview" });
  }
});

// GET /api/interview/:id
router.get("/:id", async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    res.json(interview);
  } catch (err) {
    console.error("Get Interview Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
