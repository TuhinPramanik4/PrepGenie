const express = require("express");
const multer = require("multer");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");
const Interview = require("../models/Interview");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer storage
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

/**
 * POST /api/interview/feedback
 * Provides feedback on a user's answer
 */
router.post("/feedback", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(422).json({ error: "Question and answer are required" });
    }

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
    console.error("Feedback Error:", err);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

/**
 * POST /api/interview/start
 * Generates interview questions based on resume and job role
 */
router.post("/start", upload.single("resume"), async (req, res) => {
  try {
    const { company, customCompany, role, jobDescription } = req.body;
    const resumeFile = req.file;

    // Validate required fields
    if (!resumeFile || (!company && !customCompany) || !role) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    let resumeText = "";

    // Attempt to read resume as text if it's a plain text file
    try {
      if (resumeFile.mimetype === "text/plain") {
        resumeText = fs.readFileSync(resumeFile.path, "utf-8");
      } else {
        resumeText = `Resume file is of type ${resumeFile.mimetype}. Cannot extract text directly.`;
      }
    } catch (readErr) {
      console.error("Error reading resume file:", readErr);
      return res.status(500).json({ error: "Failed to read resume" });
    }

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

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    const cleaned = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let questions;
    try {
      questions = JSON.parse(cleaned);
    } catch (jsonErr) {
      console.error("Failed to parse Gemini output as JSON:", cleaned);
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    const interview = new Interview({
      company,
      customCompany,
      role,
      jobDescription,
      resumePath: `/uploads/${resumeFile.filename}`,
      questions,
    });

    await interview.save();

    res.status(200).json({
      message: "Interview started",
      interviewId: interview._id,
    });
  } catch (err) {
    console.error("Interview Start Error:", err);
    res.status(500).json({ error: "Server error during interview setup" });
  }
});

/**
 * GET /api/interview/:id
 * Fetch interview by ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId format
  if (!id || !id.match(/^[a-fA-F\d]{24}$/)) {
    return res.status(400).json({ error: "Invalid interview ID format" });
  }

  try {
    const interview = await Interview.findById(id);
    if (!interview) {
      return res.status(404).json({ error: "Interview not found" });
    }
    res.json(interview);
  } catch (err) {
    console.error("Get Interview Error:", err);
    res.status(500).json({ error: "Server error fetching interview" });
  }
});

module.exports = router;
