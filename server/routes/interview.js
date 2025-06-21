const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Interview = require('../models/Interview');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST /api/interview/start
router.post('/start', upload.single('resume'), async (req, res) => {
  const { company, role, jobDescription } = req.body;
  const resumePath = req.file?.path;

  if (!resumePath || !role || !company) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    // Optional: Extract resume text from PDF
    const resumeText = fs.readFileSync(resumePath, 'utf8');

    // Generate questions using Gemini API (pseudo-code)
    const response = await generateQuestionsWithAI(resumeText, company, role, jobDescription);
    const questions = response.questions || [];

    const interview = new Interview({
      company,
      role,
      jobDescription,
      resumePath,
      questions,
    });

    await interview.save();
    res.json(interview);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Mock function: Replace with Gemini or OpenAI call
async function generateQuestionsWithAI(resumeText, company, role, jobDescription) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const prompt = `
You are an AI interview assistant. Based on the following resume content and job details, generate 5 tailored interview questions.

Company: ${company}
Role: ${role}
Job Description: ${jobDescription || "N/A"}

Resume:
${resumeText}

Please provide only the list of questions in plain text.
`;

  try {
    const response = await axios.post(endpoint, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const questions = rawText.split('\n').filter(line => line.trim());

    return { questions };
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    return { questions: [] };
  }
}

module.exports = router;
