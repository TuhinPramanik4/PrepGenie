const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/interview-questions', async (req, res) => {
  const { resumeText, company } = req.body;

  const prompt = `
  You are an AI interviewer for ${company}.
  Based on the candidate’s resume: ${resumeText}
  Generate 5 technical interview questions relevant to the company style.
  `;

  try {
    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] }
    );

    const questions = result.data.candidates[0].content.parts[0].text;
    res.json({ questions });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Gemini API error' });
  }
});

module.exports = router;
